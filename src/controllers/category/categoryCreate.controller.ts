import {Request, Response} from "express";
import { ICategoryRequest } from "../../interfaces/categories";
import createCategoryService from "../../services/category/categoryCreate.service";


const categoryCreateController = async (req: Request, res: Response) => {
    const category: ICategoryRequest = req.body;
    

    const createdCategory = await createCategoryService(category);

    return res.status(201).json(createdCategory)
}

export default categoryCreateController;