import { prisma } from "../../data/postgres/postgres-database";
import { CreateProductDto } from "../../domain/dtos/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/update-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";

export class ProductServiceImpl  {

  async create(createProductDto: CreateProductDto) {
    try {
      
      const newProduct = await prisma.product.create({
        data: createProductDto,
      });
  
      return ProductEntity.fromObject(newProduct);
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const allproducts = await prisma.product.findMany();

    return allproducts.map(ProductEntity.fromObject);
  }

  async findById(id: number): Promise<ProductEntity> {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) throw `Product id: ${id} not found`;

    return ProductEntity.fromObject(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const productId = await this.findById(id);

    const productUpdate = await prisma.product.update({
      where: {
        id: productId.id,
      },
      data: updateProductDto,
    });

    return ProductEntity.fromObject(productUpdate);
  }

  async remove(id: number): Promise<void> {
    const productId = await this.findById(id);

    await prisma.product.delete({
      where: {
        id: productId.id,
      },
    });
  }
}
