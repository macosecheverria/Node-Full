import { CreateProductDto } from "../../dtos/create-product.dto";
import { UpdateProductDto } from "../../dtos/update-product.dto";
import { ProductEntity } from "../../entities/product.entity";

export interface ProductService {

    create(createProductDto:CreateProductDto): Promise<ProductEntity>;

    findAll(): Promise<ProductEntity[]>

    findById(id: number): Promise<ProductEntity>;

    update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity>

    remove(id: number): Promise<void>;
}