import { UserEntity } from "../../entities/user.entity";

export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){}

    static create(props: {[key: string]: any}): [string?, CreateCategoryDto?]{

        const {name, available } = props;
        
        if(!name) return ["Name is required"];
        if(name.length <6) return ["Name too short"];
        if(!available) return ["Available is required"];
        if(typeof available !== "boolean") return ["Available must be a boolean"];

        return [undefined, new CreateCategoryDto(name, available)]
    }
}