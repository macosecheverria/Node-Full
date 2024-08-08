import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = props;

    if (!name) return ["The field name is required"];
    if(typeof available !== "boolean") return ["The field available must be a boolean"];
    if(!price) return ["The field price is required"];
    if(price <= 4) return["The field price must be greater than 5"];
    if(!description) return ["The field description is required"];
    if (!user) return ["The field user is required"];
    if(!Validators.isMongoId(user)) return ["Invalid User ID"];
    if (!category) return ["The field category is required"];
    if(!Validators.isMongoId(category)) return ["Invalid Category id"];

    return [
      undefined,
      new CreateProductDto(name, available, price, description, user, category),
    ];
  }
}
