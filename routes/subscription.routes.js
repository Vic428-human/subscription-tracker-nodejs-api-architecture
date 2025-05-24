import { Router } from 'express';

const subscriptionRouter = Router(); 

// always use plural => http://api.example.com/subscriptions
// use noun,  don't use verb  => subscriptions
subscriptionRouter.get('/' , (req, res) => res.send({title:'GET all subscriptions'}));

subscriptionRouter.get('/:id' , (req, res) => res.send({title:'GET subscription details'}));

subscriptionRouter.post('/' , (req, res) => res.send({title:'CREATE a subscription'}));

subscriptionRouter.put('/:id' , (req, res) => res.send({title:'UPDATE subscription'}));

subscriptionRouter.delete('/:id' , (req, res) => res.send({title:'DELETE subscription'}));

// get all subscripions belonging to a specific user
subscriptionRouter.get('/user/:id' , (req, res) => res.send({title:'GET all subscriptions from specific user'}));
// cancel a user subscription
subscriptionRouter.put('/:id/cancel' , (req, res) => res.send({title:'CANCEL subscription from specific user'})); 
// get all upcoming renewals 
subscriptionRouter.get('/upcoming-renewals' , (req, res) => res.send({title:'GET upcoming renewals'})); 


export default subscriptionRouter;