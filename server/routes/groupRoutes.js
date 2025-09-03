import express from 'express'
import { protectRoute } from '../middlewares/protectRoutes.js';
import { addUser, createGroup, deleteGroup, getGroupDetails, getGroups, getUsers, leaveGroup } from '../controllers/groupController.js';

const groupRouter=express.Router();

groupRouter.post("/create",protectRoute,createGroup);
groupRouter.get("/",protectRoute,getUsers);
groupRouter.post("/add/:groupid",protectRoute,addUser);
groupRouter.get("/all",protectRoute,getGroups);
groupRouter.get("/get/:groupid",protectRoute,getGroupDetails)
groupRouter.put("/:groupid/leave",protectRoute,leaveGroup);
groupRouter.delete("/:groupid",protectRoute,deleteGroup);

export default  groupRouter;