
import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const signUp = async (req, res, next ) => {
    // mongoose session is nothing to do with user session 
    // 事务必须具备四大特性：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability），简称ACID
    // atomic operations => 不可分割的更新操作。 它保證在多執行緒環境下，對共享資源的更新是安全的，不會發生競爭狀態（race condition）。
    // Insert either workd or don't
    // Update either work or don't
    // never get half n operation 
    // 用於避免將錯誤的操作輸入給數據庫，讓開發人員可以即時知道錯誤的問題點
    // Using Mongoose's default connection
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Step 1: Create a new user based on model
        const user = await User.create(
            [
                {
                    name: 'John Wick',
                    email: 'john.wick@example.com',
                },
            ],
            { session } // Include session for transaction
        );


        // 将操作所做的更改保存在多文档事务中并结束该事务。
        await session.commitTransaction();
        console.log("commitTransaction => 将操作所做的更改保存在多文档事务中并结束该事务。");

        // Commit the transaction
        console.log('Transaction successful: Customer and Billing Address created.');
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

// const conn = require("../models/connection"); 


// // 參考這篇 => https://onthor.medium.com/understanding-mongoose-transactions-and-rollbacks-f074078ff604
// // const example = async () => {
// //     const session = await conn.startSession();

// //     try {
// //         session.startTransaction();  

// //         await Model.create([{ /* payload */ }], { session });

// //         await Model.deleteOne({ /* conditions */ }, { session });

// //         await Model.updateOne({ /* conditions */ }, { /* payload */ }, { session } );

// //         await Model.findByIdAndUpdate(_id, { /* payload */  }, { session });

// //         const user = new Model( /* payload */);
// //         await user.save({ session });
        
// //         await session.commitTransaction();
         
// //     } catch (error) { 
// //         await session.abortTransaction();
// //     }
// //     session.endSession();
// // }


// // startSession(): Initiates a session.
// // startTransaction(): Begins a transaction in the session.
// // commitTransaction(): 将操作所做的更改保存在多文档事务中并结束该事务。.
// // abortTransaction(): Rolls back the transaction.
// // Options: Operations in a transaction must pass the session using { session }.