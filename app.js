// app.js is the center of the application
import {PORT, NODE_ENV } from './config/env.js'; 
import express from 'express'

import userRouter  from './routes/user.routes.js'
import subscriptionRouter  from './routes/subscription.routes.js'
import authRouter  from './routes/auth.routes.js'
import connectTODataBase from './database/mongodb.js'
import errorMiddleware from './middleware/error.middleware.js';
// 打包前是typescript，所以往上讀取的時候看到的是ts的內容，但下載到node_modules後讀取的是js的內容,已經是打包後的內容
import cookieParser from 'cookie-parser';


const app = express()

// handle json data send it toㄑ request 
app.use(express.json())

// express.urlencoded 使用的理由 => 看更多 B-1 
// 至於為什麼設定true，是因為考量到前端也有可能傳巢狀結構回來
app.use(express.urlencoded({ extended: true }))
// `cookie-parser` 會把請求中的 Cookie 解析成一個對象，儲存在 `req.cookies` 中。可以透過造訪 `req.cookies` 來取得 Cookie 的值。
app.use(cookieParser())

// ex: /api/v1/users/ => or which routes you want to use
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
// ex: /api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter)


app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker api!')
})
// we need to make out sever to listen for requests trying to access specific routes
app.listen(PORT, async () => {
    console.log(`subscription tracker api listening at http://localhost:${PORT} 在環境 ${NODE_ENV}`)

    await connectTODataBase()   
})

export default app


// B-1 
// function MyForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: ''
//   });

//   // 當你用這段程式碼送出資料時，假設你的 formData 內容如下
//         // const formData = {
//         //     username: 'alice',
//         //     email: 'alice@example.com'
//         // };


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     // 將資料以 x-www-form-urlencoded 格式送出
//     const params = new URLSearchParams();
//     // 內容加入 params 之後，這個 params 物件會包含兩組 key/value：
//     // username: alice
//     // email: alice@example.com

//     for (let key in formData) {
//       params.append(key, formData[key]);
//     }
    
//     // 此時的 params 物件（假設 formData 為 { username: 'alice', email: 'alice@example.com' }），會被序列化成一個 x-www-form-urlencoded 格式的字串，內容如下：
//     // 非巢狀的結構 : username=alice&email=alice@example.com 備註: @ === %40
//     // 但如果，extended: true ，則支持巢狀結構 => 例如，前端送出 user[name]=alice&user[email]=alice@example.com，後端會解析成：
//     // 巢狀結構假數據 => user: { name: 'alice', email: 'alice@example.com' }
//     await axios.post('/api/your-endpoint', params, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
//   };

//   return (
//     // <form> 表單預設的提交格式，後端可以直接以鍵值對方式取得資料
//     // 後端參數接收方式不同：如果使用 application/json，後端通常需要特殊處理（如 Spring 需加上 @RequestBody），
//     // 否則無法直接取得資料；而 x-www-form-urlencoded 可以直接用常見的參數接收方式取得資料
//     // 自動處理特殊字元：這種格式會自動將特殊字元進行編碼，避免資料解析錯
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         placeholder="Username"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <button type="submit">送出</button>
//     </form>
//   );
// }