import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
    constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){};

    static fromObject(props: {[key:string]: any}):CategoryEntity {
        const {name, available} = props;

        if(!name) throw CustomError.badRequest("Name is required");
        if(!available) throw CustomError.badRequest("Available is required");
        if(typeof available !== "boolean") throw CustomError.badRequest("Available must be a boolean");

        return new CategoryEntity(name, available);
    }
}