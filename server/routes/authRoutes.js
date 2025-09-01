import express from 'express'
import { deleteUser, getUser, login, logout, signup } from '../controllers/userController.js';
import { protectRoute } from '../middlewares/protectRoutes.js';

export const authRouter=express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login);
authRouter.delete("/",protectRoute,deleteUser)
authRouter.get("/",protectRoute,getUser);
authRouter.get("/logout",protectRoute,logout)


