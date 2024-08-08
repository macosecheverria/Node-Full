import { CustomError } from "../errors/custom-error";
import { UserEntity } from "./user.entity";

export class CategoryEntity {
    private constructor(
        public readonly id:number,
        public readonly name: string,
        public readonly available: string,
        public readonly user: UserEntity
    ){}

    static fromObject(props: {[key: string]: any}):CategoryEntity {
        const {id, name, available, user} = props;

        if(!id) throw CustomError.badRequest("Missing id");
        if(!name) throw CustomError.badRequest("Missing name");
        if(!available) throw CustomError.badRequest("Missing available");

        return new CategoryEntity(id, name, available, user);
    }
}