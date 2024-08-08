import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, UpdateCategoryDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  create = (req: Request, res: Response) => {
    const [errorDto, categoryDto] = CreateCategoryDto.create(req.body);

    if (errorDto) return res.status(400).json({ errorDto });

    return this.categoryService
      .create(categoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handlerError(error, res));
  };

  findAll = (req: Request, res: Response) => {
    return this.categoryService
      .findAll()
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handlerError(error, res));
  };

  findById = (req: Request, res: Response) => {
    const id = +req.params.id

    return this.categoryService.findById(id)
      .then(category => res.status(200).json(category))
      .catch(error => this.handlerError(error, res));
  };

  update = (req: Request, res: Response) => {
    const [errorDto, updateDto] = UpdateCategoryDto.create(req.body);

    if(errorDto) return res.status(400).json({error:errorDto});

    const id = +req.params.id

    return this.categoryService.update(id, updateDto!)
      .then(category => res.status(200).json(category))
      .catch(error => this.handlerError(error, res));

  };

  remove = (req: Request, res: Response) => {
    const id = +req.params.id
    
    return this.categoryService.remove(id)
      .then(category => res.status(200).json("Category Deleted"))
      .catch(error => this.handlerError(error, res));
  };

  private handlerError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json("Internal Server Error");
  }
}
