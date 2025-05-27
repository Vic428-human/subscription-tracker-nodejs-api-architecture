
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next ) => {
    // 基於ACID 特性 不會發生競爭狀態（race condition）。
    // mongoose 的 session 作法，就能達到這個效果
    // 用於避免將錯誤的操作輸入給數據庫，讓開發人員可以即時知道錯誤的問題點
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body
        console.log('email===>', email)
        // 確認使用者是否存在
        const existingUser = await User.findOne({email})
        console.log('existingUser', existingUser)
        if(existingUser){
            const error =  new Error('User already exist')
            error.statusCode = 409; // 您修改要求的操作會導致伺服器的資源出現一種不可能或不一致的狀態。例如您嘗試修改某個使用者的使用者名，然後該使用者名稱與其他使用者名稱有衝突。
            throw error
        }
        // 使用者不存在 => 可以創建新的User，但密碼要記得採加鹽加密法
        // BCrypt比MD5更安全，因為它會自動幫每個密碼隨機加鹽並把鹽混在密碼裡，不需要額外存鹽值，也更難被破解。
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // session 放在第二個參數的用意 => 表示如果等下 abortTransaction ，User就不會被成功創建，能避免錯誤資料inser到DB裡
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

        // JWT 通常用來驗證使用者身份，並授予使用者特定的權限或資源。
        // 備註： Expected "payload" to be a plain object. 之前寫成傳字串過去，所以在這debug了一段時間
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN}); // https://www.npmjs.com/package/jsonwebtoken
        await session.commitTransaction();

        // 所以之後前端會收到帶有 jwt的token(用來驗證使用者身份)，表示之前有成功登入過，下次前端要登入，就拿這個token來驗證
        res.status(201).json({success: true, message: 'User create successfully', date: {token, user: newUsers[0]} });

    } catch (error) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        console.error('Transaction failed:', error);
    } 
      session.endSession(); // End the session, if something goes wrong, the session will be rolled back

//  return res.send({title:'sign-up!!'})
} 
export const signIn = (req, res, next)=> {    
   return  res.send({title:'signIn'})
}

export const signOut = (req, res, next)=> {    
}

// await Model.create => 回傳結果參考
// {
//   "_id": "6655e1b8b4e8a123456789ab",
//   "name": "Alice",
//   "email": "alice@example.com",
//   "__v": 0
// }


// API 與 mongoose 交互 => https://onthor.medium.com/understanding-mongoose-transactions-and-rollbacks-f074078ff604
// const example = async () => {
//      const session = await mongoose.startSession();
//      
//     try {
//         session.startTransaction();  

//         await Model.create([{ /* payload */ }], { session });

//         await Model.deleteOne({ /* conditions */ }, { session });

//         await Model.updateOne({ /* conditions */ }, { /* payload */ }, { session } );

//         await Model.findByIdAndUpdate(_id, { /* payload */  }, { session });

//         const user = new Model( /* payload */);
//         await user.save({ session });
        
//         await session.commitTransaction();
        
//     } catch (error) { 
//         await session.abortTransaction();
//     }
//     session.endSession();
// }


// // startSession(): Initiates a session.
// // startTransaction(): Begins a transaction in the session.
// // commitTransaction(): 将操作所做的更改保存在多文档事务中并结束该事务。.
// // abortTransaction(): Rolls back the transaction.
// // Options: Operations in a transaction must pass the session using { session }.
