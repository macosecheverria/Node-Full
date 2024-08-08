import { CustomError } from "../errors/custom-error";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";

export class ProductEntity {
    private constructor(
        public readonly name:string,
        public readonly available: boolean,
        public readonly description: string,
        public readonly user: UserEntity,
        public readonly category: CategoryEntity
    ) {}

    static fromObject(props: {[key: string]: any}):ProductEntity {
        const {name, available, description, user, category} = props;

        if(!name) throw CustomError.badRequest("Missing name");
        if(!available) throw CustomError.badRequest("Missing available");
        if(!description) throw CustomError.badRequest("Missing description");
        if(!category) throw CustomError.badRequest("Missing category");

        return new ProductEntity(name, available, description, user, category);
    }
}