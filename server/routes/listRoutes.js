import express from 'express'
import { createList, getLists, getSelectedList, saveList } from '../controllers/listcontrollers.js';
import { protectRoute } from '../middlewares/protectRoutes.js';

const listRouter=express.Router();

listRouter.post("/",protectRoute,createList);
listRouter.get("/",protectRoute,getLists);
listRouter.get("/:listid",protectRoute,getSelectedList)
listRouter.post("/savelist",protectRoute,saveList)


export default listRouter;