export class UpdateProductDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.id) returnObject.id = this.id;
    if (this.name) returnObject.name = this.name;
    if (this.description) returnObject.description = this.description;
    if (this.price) returnObject.price = this.price;

    return returnObject;
  }

  static update(props: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id, name, description, price } = props;

    if (!name) return ["The field name cannot be null", undefined];
    if (!description) return ["The field name cannot be null", undefined];
    if (!price) return ["The field name cannot be null", undefined];
    if (price < 5) return ["The fiel price cannot be less than 5"];

    return [undefined, new UpdateProductDto(id, name, description, price)];
  }
}
