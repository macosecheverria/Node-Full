import { ProductModel } from "../../data/mongo/models/product-model";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors/custom-error";

export class ProductService {
    
  public async create(createUserDto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = await ProductModel.create(createUserDto);

    await newProduct.save();

    return ProductEntity.fromObject(newProduct);
  }

  public async findAll(): Promise<ProductEntity> {
    const allProducts = await ProductModel.find();

    return ProductEntity.fromObject(allProducts);
  }

  public async findById(id: number): Promise<ProductEntity> {
    const productId = await ProductModel.findOne({ id: id });

    if (!productId) {
      throw CustomError.notfound(`Product id: ${productId} not found`);
    }

    if (isNaN(productId.id)) {
      throw CustomError.badRequest("Product id is number");
    }

    return ProductEntity.fromObject(productId);
  }

  public async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const product = await this.findById(id);

    const productUpdated = await ProductModel.updateOne({
      id: product.id,
      name: updateProductDto.name,
      description: updateProductDto.description,
      price: updateProductDto.price,
    });

    return ProductEntity.fromObject(productUpdated);
  }

  public async remove(id: number) {
    const product = await this.findById(id);

    await ProductModel.deleteOne({
      id: product.id,
    });
  }
}
