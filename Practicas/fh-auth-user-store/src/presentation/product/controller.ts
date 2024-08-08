import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, CustomError } from "../../domain";

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){};

    create = (req: Request, res:Response) => {
        const [errorDto, createDto] = CreateProductDto.create(req.body);
        if(errorDto) return res.status(400).json({error: errorDto});

        return this.productService.create(createDto!, req.body.user)

    }

    findAll = (req: Request, res:Response) => {

    }

    findById = (req:Request, res:Response) => {

    }

    update = (req:Request, res: Response) => {

    }

    remove = (req:Request, res: Response) => {

    }

    private handlerError(error:unknown, res:Response) {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: "Internal Server Error"});
    }
}