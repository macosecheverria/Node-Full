export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly description:string,
        public readonly price: number
    ){}

    static create(props: {[key:string]: any}): [string?, CreateProductDto?]{
        const {name, description, price} = props;

        if(!name) return ["The field name cannot be null", undefined];
        if(!description) return ["The field name cannot be null", undefined];
        if(!price) return ["The field name cannot be null", undefined];
        if(price < 5) return ["The fiel price cannot be less than 5"];

        return  [undefined, new CreateProductDto(name, description, price)];
    }
}