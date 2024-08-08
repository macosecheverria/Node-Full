import { CustomError } from "../errors/custom.error";

export class ProductEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number
  ) {}

  public static fromObject(props: { [key: string]: any }): ProductEntity {
    const { id, name, description, price } = props;

    if (!name) throw CustomError.badRequest("Name is required");
    if (!description) throw CustomError.badRequest("Name is required");
    if (!price) throw CustomError.badRequest("Name is required");

    return new ProductEntity(id, name, description, price);
  }
}
