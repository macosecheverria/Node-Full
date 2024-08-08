import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  create = (req: Request, res: Response) => {
    const [error, createDto] = CreateProductDto.create(req.body);

    if (error) res.status(400).json({ error });

    return this.productService
      .create(createDto!)
      .then((product) => res.status(201).json({ product }));
  };

  findAll = (req: Request, res: Response) => {
    const products = this.productService.findAll();

    return res.status(200).json(products);
  };

  findById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const product = this.productService.findById(id);

    return res.status(200).json({ product });
  };

  update = (req: Request, res: Response) => {
    const [error, updateDto] = UpdateProductDto.update(req.body);

    if (error) res.status(400).json({ error });

    const id = +req.params.id;

    return this.productService
      .update(id, updateDto!)
      .then((product) => res.status(200).json({ product }));
  };

  remove = (req: Request, res: Response) => {
    const id = +req.params.id;

    this.productService.remove(id);

    return res.status(200).json({ message: "Product deleted" });
  };
}
