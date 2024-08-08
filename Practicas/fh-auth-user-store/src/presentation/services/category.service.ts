import { prisma } from "../../data/postgres";
import {
  CategoryEntity,
  CreateCategoryDto,
  CustomError,
  UpdateCategoryDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  public async create(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const existCategory = await prisma.category.findFirst({
      where: { name: createCategoryDto.name },
    });

    if (existCategory) throw CustomError.badRequest("Category already exist");

    try {
      const newCategory = await prisma.category.create({
        data: {
          ...createCategoryDto,
          userId: user.id
        },
      });

      const category = CategoryEntity.fromObject(newCategory);

      return category;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }

  public async findAll() {
    const allCategories = await prisma.category.findMany();

    const category = allCategories.map((category) => {
      const categories = CategoryEntity.fromObject(category);
      return categories;
    });

    return category;
  }

  public async findById(id: number) {
    const categoryId = await prisma.category.findFirst({
      where: { id: id },
    });

    if (!categoryId)
      throw CustomError.notFound(`Category id ${id} not found`);

    const category = CategoryEntity.fromObject(categoryId);

    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryId = await this.findById(id);

    try {
      const updateCategory = await prisma.category.update({
        where: { id: categoryId.id },
        data: updateCategoryDto,
      });

      const category = CategoryEntity.fromObject(updateCategory);

      return category;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }

  public async remove(id: number) {
    const categoryId = await this.findById(id);

    const categoryDeleted = await prisma.category.delete({
      where: { id: categoryId.id },
    });

    return categoryDeleted;
  }
}
