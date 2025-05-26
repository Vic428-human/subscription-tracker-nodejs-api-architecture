import { Router } from 'express';
import { signIn } from '../controllers/auth.controller.js'; 

const authRouter = Router(); 

// ex: /api/v1/auth/sign-up
// authRouter.post('/sign-up' , signUp);
authRouter.post('/sign-in' , signIn);
// authRouter.post('/sign-out' , signOut);

export default authRouter;

// handler，處理重複且相同的邏輯
// 我們未來會有多個routes，如果每次都寫相同的 handler 去處理類似的事情，這個檔案的代碼會變得
// 很臃腫，所以要另外獨立出一份 controller 去減輕臃腫問題