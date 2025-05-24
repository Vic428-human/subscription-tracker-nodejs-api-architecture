import { Router } from 'express';

const userRouter = Router(); 

// you can make a requests using the browser, because when searching for a website a browser automativally make a get request and ouput the html for you that response is JSON data
userRouter.get('/' , (req, res) => res.send({title:'GET all users'}));

userRouter.get('/:id' , (req, res) => res.send({title:'GET user details'}));

userRouter.post('/' , (req, res) => res.send({title:'CREATE new user'}));

userRouter.put('/:id' , (req, res) => res.send({title:'UPDATE user'}));

userRouter.delete('/:id' , (req, res) => res.send({title:'DELETE user'}));

export default userRouter;