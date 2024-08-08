import { CustomError } from "../errors/custom-error";

export class  ProductEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number
    ){}

    public static fromObject(object: {[key: string]: any}) {
        const {id, name, description, price} = object;

        if(id)  CustomError.badRequest("Missing Id");
        if(!name)  CustomError.badRequest("Missing name");
        if(!description)  CustomError.badRequest("Missing description");
        if(!price)  CustomError.badRequest("Missing price");

        return new ProductEntity(id, name, description, price);
    }
}