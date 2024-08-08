import { prisma } from "../../data/postgres";
import { CategoryEntity, CreateProductDto, CustomError, ProductEntity, UpdateProductDto, UserEntity } from "../../domain";

export class ProductService {

    public async create(createProdductDto: CreateProductDto, user: UserEntity, category: CategoryEntity){
        const existProductName =  await prisma.product.findFirst({
            where: {name: createProdductDto.name}
        })

        if(existProductName) throw CustomError.badRequest("Product already exist");

        try {
            const newProduct = await prisma.product.create({
                data: {
                    ...createProdductDto,
                    userId: user.id,
                    categoryId: category.id
                }
            })

            const product =  ProductEntity.fromObject(newProduct);

            return product;            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError("Internal Server Error");
        }
    }

    public async findAll(){

    }

    public async findById(id: number){

    }

    public async update(id: number,updateProductDto: UpdateProductDto){

    }

    public async remove(id: number){

    }
}