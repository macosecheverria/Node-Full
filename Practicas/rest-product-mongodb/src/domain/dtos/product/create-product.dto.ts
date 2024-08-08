export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number, 
    ){}

    static create(props: {[key: string]: any}): [string?, CreateProductDto? ] {
        const {name, description, price } = props;

        if(!name) return  ["The field name is required", undefined];
        if(!description) return ["The field description is required", undefined];
        if(!price) return ["The field price is required", undefined]


        return [undefined, new CreateProductDto(name, description, price)];
    }
}