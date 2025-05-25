import mongoose from 'mongoose';
const { Schema } = mongoose;

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
};

const userSchema = new Schema({
  //trim => https://mongoosejs.com/docs/api/schemastring.html#SchemaString.prototype.trim()
  // "  hello", or "hello ", or "  hello ", would end up being saved as "hello" => ensure the strings you save through the schema are properly trimmed 
  name: { type: String, trim: true, minlength: 2,maxlength: 50, required: [true, 'User name is required'] },
  // validate specifies a function to be called for validation (doesn't need to use regexes), 
  // match specifies a validation regex directly

  // contact@exampel.com => sring@sring.sring => 不過這種判斷方式就比較單純
  email: { type: String, trim: true, unique: true, lowercase: true, minlength: 5,maxlength: 255, required: [true, 'User email is required'], 
    // TODO: 有時間實驗 validate 跟 match 各自只使用其中一種的狀況
    validate: [validateEmail, 'Please fill a valid email address'], // 不透過regex方式，其實可以註解      
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'] // 必須用regex方式
  },
  password: { type: String, minlength: 5,  required: [true, 'User password is required'] },
 
},{timestamps: true});// Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema
// createdAt: a date representing when this document was created
// updatedAt: a date representing when this document was last updated

export default mongoose.model('User', userSchema); // 假裝是 User

// 之後調用如下
// let doc = await User.create({ name: 'test', email: 'test', password: 'test' });

// 創建的時候會更新
// console.log(doc.createdAt); // 2022-02-26T16:37:48.244Z
// console.log(doc.updatedAt); // 2022-02-26T16:37:48.244Z

// 更改數據的時候也會更新 updatedAt
// doc.name = 'test2';
// await doc.save();
// console.log(doc.createdAt); // 2022-02-26T16:37:48.244Z => 這邊仍然維持一樣的
// console.log(doc.updatedAt); // 2022-02-26T16:37:48.307Z => 會發現只有這裡更新


