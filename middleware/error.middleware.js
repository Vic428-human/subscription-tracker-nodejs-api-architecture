const errorMiddleware = (err, req, res, next) => {
    try{
        let error  = { ...err }; 
        error.message = err.message;
        console.error(err);

        // mongoose bad objectID    
        // CastError: Cast to embedded failed for value
        if (err.name === 'CastError') { // An instance of this error class will be returned when mongoose failed to cast a value. => 了解更多 查看 A-1 
            const message  = 'Resource not found，或檢查推送的數據是否格式上跟schema有出入';
            error = new Error(message); 
            error.statusCode = 404;


            // new Error(message) 執行後的假數據回傳結果:
            // {
            //     name: 'CastError or something else',
            //     message: 'Resource not found，或檢查推送的數據是否格式上跟schema有出入',
            //     statusCode: 404,
            //     stack: 'Error: Resource not found，或檢查推送的數據是否格式上跟schema有出入\n    at ...'
            // }
        }

        // Mongoose duplicate key
        // ex: {"name":"MongoError","code":11000,"err":"insertDocument :: caused by :: 11000 E11000 duplicate key error index: mydb.users.$email_1  dup key: { : null }"} 
        // => The error message is saying that there's already a record with null as the email.
        // => 例如： _id 1 : alice@email.com 跟 _id 3 : alice@email.com ，這兩個的值重複了，這時候可以把 3的那一筆刪除
        // => 或者， _id 4 : null, _id 5 : null, 這兩個的值重複了，這時候可以把 5的那一筆刪除
        if (err.code === 11000) {  // 了解更多 查看 A-2
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        //  Mongoose validation error
        // message: "Username is required. Email is invalid"
        if(err.name === 'ValidationError'){ //了解更多 查看 A-3
            const message = Object.values(err.errors).map(el => el.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        // Sets the HTTP status for the response. It is a chainable alias of Node’s => https://stackoverflow.com/questions/50888305/res-status-vs-res-statuscode
        res.status(error.statusCode || 500).json({ // The res.json() function sends a JSON response => https://www.geeksforgeeks.org/express-js-res-json-function/
            success: false,
            error: error.message || 'Server Error'
            
        })

    }catch(err){
       
        next(err)
    }}

//  create a subscription => middleware (check the subscription model such as renewal date.) => other middleware (ex: check for error )
//   => call next() =>  controller 


export default errorMiddleware

// A-1 CastError 情境：

//  假設 comment schema 如此定義 
// comment: [{
//         name: { type: String, default: '路人' },
//         time: { type: Date, default: Date.now }, // => Scema里的Date.now是在没有值的情况下执行该函数，并非值是函数
//         content: { type: String, required: true }
//     }]

//  所以當 新建评论
// const comment = {
//     name: ctx.request.body.name || '路人',
//     time: Date.now
//     content: ctx.request.body.content
// }
 
// 插入评论，這時候會失敗跳出 CastError 錯誤訊息，原因是 传入的 Date.now 是一个函数
// const data = await Article.findByIdAndUpdate({ '_id': id }, { $push: { comment } }, { new: true });

// A-2 11000 情境：
// Drop the collection => db.users.drop();

// Find the document which has that value and delete it. Let's say the value was null, you can delete it using:
// db.users.remove({ email_address: null });

// Drop the Unique index: (這個要留意，除非你今天的數據是允許出現重複的)
// db.users.dropIndex(indexName)


//  A-3 情境：
// const err = {
//   name: 'ValidationError',
//   errors: {
//     username: {
//       message: 'Username is required',
//       name: 'ValidatorError',
//       path: 'username',
//       value: ''
//     },
//     email: {
//       message: 'Email is invalid',
//       name: 'ValidatorError',
//       path: 'email',
//       value: 'not-an-email'
//     }
//   }
// };

