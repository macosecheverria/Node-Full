export class UpdateProductDto {
    private constructor(
        public readonly description: string,
        public readonly price: number
    ){}

    static formObject(props: {[key: string]: any}): [string? , UpdateProductDto?] {
        const {description, price} = props;
        
        if(!description) return ["The field Description is required"];
        if(description.length < 10) return ["The field Description too short, must be more or equal to 10 letter"];
        if(!price) return ["The field Price is required"];
        if(price < 5) return ["The field Price must be greater than 5"]; 

        return [undefined,  new UpdateProductDto(description, price)];
    }
}