import {Router} from 'express';
import{register,login} from '../controllers/user.js';
import {auth} from '../middlewares/auth';

const userRouter=Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.patch('/updateProfile',auth,updateProfile);


export default userRouter;