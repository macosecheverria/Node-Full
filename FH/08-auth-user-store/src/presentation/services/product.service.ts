import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  async createProduct(createProductDto: CreateProductDto) {
    const existProduct = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (existProduct) throw CustomError.badRequest("Product already exist");

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("internal Server Error");
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        prev: `/api/products/?page=${page - 1}&limit${limit}`,
        next: `/api/products/?page=${page + 1}&limit${limit}`,
        products: products,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Internal Server Error");
    }
  }
}
