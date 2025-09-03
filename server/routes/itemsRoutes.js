import express from 'express'
import { protectRoute } from '../middlewares/protectRoutes.js';
import { getCategories, getInventory, queryString, searchString } from '../controllers/itemsController.js';

const inventoryRouter=express.Router();

//listRouter.post("/list")
inventoryRouter.get("/categories",protectRoute,getCategories)
inventoryRouter.get("/",protectRoute,getInventory);
inventoryRouter.get("/category",protectRoute,queryString);
inventoryRouter.get("/search",protectRoute,searchString);



export default inventoryRouter;