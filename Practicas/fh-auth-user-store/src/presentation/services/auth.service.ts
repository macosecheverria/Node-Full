import { BcryptAdapter, JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UserEntity,
} from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existEmail = await prisma.user.findFirst({
      where: {
        email: registerUserDto.email,
      },
    });

    if (existEmail) throw CustomError.badRequest("Email already exist");

    const passwordEncoder = BcryptAdapter.hash(registerUserDto.password);

    try {
      const user = await prisma.user.create({
        data: {
          ...registerUserDto,
          password: passwordEncoder,
        },
      });

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await prisma.user.findFirst({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user)
      throw CustomError.notFound("User not found,please register a user");

    const isMatching = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const token = await  JwtAdapter.generatedToken({
      id: user.id,
      email: user.email,
    });

    if (!token)
      throw CustomError.internalServerError("Error while creating jwt");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    return {
      user: userEntity,
       token,
    };
  }

  public async findAll() {
    const allUsers = await prisma.user.findMany();

    const users = allUsers.map((user) => {
      const { password, ...userEntity } = UserEntity.fromObject(user);
      return userEntity;
    });

    return users;
  }

  public async findById(id: number) {
    const userbyId = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userbyId) throw CustomError.notFound("User not found");

    const { password, ...userEntity } = UserEntity.fromObject(userbyId);

    return userEntity;
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const userId = await this.findById(id);

    try {
      const userUpdated = await prisma.user.update({
        where: { id: userId.id },
        data: updateUserDto,
      });

      const { password, ...userEntity } = UserEntity.fromObject(userUpdated);

      return userEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }

  public async remove(id: number) {
    const userId = await this.findById(id);

    try {
      const userDeleted = await prisma.user.delete({
        where: { id: userId.id },
      });

      return userDeleted;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }
}
