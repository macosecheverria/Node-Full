import { Request, Response } from "express";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/update-product.dto";
import { ProductServiceImpl } from "../services/product.service";

export class ProductController {
  constructor(private productService: ProductServiceImpl) {}

  create = (req: Request, res: Response) => {
    const [error, createDto ] = CreateProductDto.create(req.body);


    if(error) return res.status(400).json({error});

    return this.productService.create(createDto!).then(product => res.status(201).json(product));

  };

  findAll = (req: Request, res: Response) => {
     
    return this.productService.findAll().then(products => res.status(200).json(products));

  };

  findById = (req: Request, res: Response) => {
    const id = +req.params.id;

    return this.productService.findById(id).then(product => res.status(200).json(product));
  };

  update = (req: Request, res: Response) => {
    const [error, updateDto] = UpdateProductDto.update(req.body);

    if(error) res.status(400).json({error});

    const id = +req.params.id;

    return this.productService.update(id, updateDto!).then(product => res.status(200).json(product));
  };

  remove = (req: Request, res: Response) => {
    const id = +req.params.id;

    return this.productService.remove(id).then(product => res.status(200).json(product))
  };
}
