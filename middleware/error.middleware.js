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
        }

        // 
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
