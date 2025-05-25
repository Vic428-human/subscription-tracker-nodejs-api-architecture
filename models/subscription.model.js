// create sunscription model
import mongoose from 'mongoose';
const { Schema } = mongoose;


const subscriptionSchema = new Schema({
    name: { type: String, trim: true, minlength: 2,maxlength: 100, required: [true, 'Subscription name is required'] },
    price:{ type: Number, min: [0, 'Price must be greater than 0'], required: [true, 'Subscription price is required'],},
    currency:{ type: String,enum:['USD', 'EUR', 'GBP'], default: 'USD',},
    // How often getting charge of this subscription
    frequency:{ type: String, enum:[ 'daily','weekly', 'monthly', 'yearly'],},
    category:{ type: String, enum:['sports', 'entertainment', 'news', 'lifestyle','technology','finance','politics', 'other'],required: true },
    paymentMethod:{ type:String, require: true, trim: true }, 
    status: { type: String, enum:['active', 'cancelled', 'expired'], default: 'active' },
    // when is the start date of the subscription
    startDate: { 
        type: Date,
        required: true, 
        validate: {
            validator: (value) => value < new Date(), // check if the start date is before the current date
            message: 'Start date must be in the past'
         },
     default: Date.now 
    },
    renewalDate: { 
        type: Date,
        // required: true,  這裡可以不用提供，透過 pre 的方式自動計算
        validate: {
            validator: function(value) {
                return value > this.startDate
            }, // check if the start date is after the current date
            message: 'renewal date must be in the future'
         },
     default: Date.now 
    },
    // user => point other model in the database
    user:{  // 這代表每一則留言都必須有一個 user 欄位，這個欄位會存放一個 User 的 _id，而且必須要填寫。
        type: Schema.Types.ObjectId, // 也就是 MongoDB 用來唯一標識每一筆資料的特殊 ID 格式，這個欄位儲存的是某個 User 文件的 _id，這樣設計可以讓你之後用 .populate() 來把 ObjectId 自動換成對應的 User 文件內容
        ref: 'User',
        required: true,
        // It will optimize the query by indexing the user field in the subscription collection
        index: true, 
    }
})

// auto calculate renewal date if missing 
// pre => 儲存到db前，先計續訂日期
subscriptionSchema.pre('save', function(next) {
    // 先判斷續訂日期存不存在 
    if (!this.renewalDate) {
      // 需要有哪些期間的選項
      const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
      }

    // 續訂 = 當時的開始日 ＋ 續訂的期間
    this.renewalDate = new Date(this.startDate); //ex: 	2025-05-26
    // getDate => 當月的日期（1~31）, renewalPeriods 抓出增加了多少天 ，然後把新的開始日期覆蓋上去 
    this.renewalDate.setDate(this.startDate.getDate() + renewalPeriods[this.frequency]);

    }

  });



export default mongoose.model('Subscription', subscriptionSchema);

// {
//   "_id": ObjectId("6652f1e5b2c4a3f8e6a1d2c3"),
//   "name": "Netflix 月費",
//   "price": 320,
//   "currency": "USD",
//   "frequency": "monthly",
//   "category": "entertainment",
//   "paymentMethod": "信用卡",
//   "status": "active",
//   "startDate": ISODate("2024-06-01T00:00:00.000Z"),
//   "renewalDate": ISODate("2025-06-01T00:00:00.000Z"),
//   "user": ObjectId("664f1a2b3c4d5e6f7a8b9c0d"),
//   "__v": 0
// }

