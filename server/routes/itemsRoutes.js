import express from 'express'
import { protectRoute } from '../middlewares/protectRoutes.js';
import { addNewItem, getCategories, getInventory, queryString, searchString } from '../controllers/itemsController.js';
import { upload } from '../middlewares/multer.js';

const inventoryRouter=express.Router();

//listRouter.post("/list")
inventoryRouter.get("/categories",protectRoute,getCategories)
inventoryRouter.get("/",protectRoute,getInventory);
inventoryRouter.get("/category",protectRoute,queryString);
inventoryRouter.get("/search",protectRoute,searchString);
inventoryRouter.post("/add",protectRoute,upload.single("image"),addNewItem);



export default inventoryRouter;