import express from 'express'
import { protectRoute } from '../middlewares/protectRoutes.js';
import { addUser, createGroup, getGroupDetails, getGroups, getUsers } from '../controllers/groupController.js';

const groupRouter=express.Router();

groupRouter.post("/create",protectRoute,createGroup);
groupRouter.get("/",protectRoute,getUsers);
groupRouter.post("/add/:groupid",protectRoute,addUser);
groupRouter.get("/all",protectRoute,getGroups);
groupRouter.get("/get/:groupid",protectRoute,getGroupDetails)

export default  groupRouter;