export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly description: string,
        public readonly price: number,
    ){}

    static create(props: {[key: string]: any}): [string?, CreateProductDto?] {
        const {name, available, description, price} = props;

        if(!name) return ["The field Name is required"];
        if(name.length < 3) return ["The field name too short, must be greater or equal to 3 letter"];
        if(!available) return ["The field Available is required"];
        if(typeof available !== "boolean") return ["The field Available must be a boolean"];
        if(!description) return ["The field Description is required"];
        if(description.length < 10) return ["The field Description too short, must be more or equal to 10 letter"];
        if(!price) return ["The field Price is required"];
        if(price < 5) return ["The field Price must be greater than 5"]; 

        return [undefined, new CreateProductDto(name, available, description, price)]
    }
}