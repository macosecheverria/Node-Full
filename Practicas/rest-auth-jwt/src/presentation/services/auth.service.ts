import { BcryptAdapter, JwtAdapter, envs } from "../../config";
import { UserModel } from "../../data/mongo/models/user.model";
import type { RegisterUserDto,LoginUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { EmailService } from "./email.service";

export class AuthService {
  
    constructor(private readonly emailService: EmailService){};

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({
      email: registerUserDto.email,
    });

    if (existUser) throw CustomError.badRequest("User email already exist");

    try {
      const user = new UserModel(registerUserDto);

      user.password = BcryptAdapter.hash(registerUserDto.password);

      user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: "abc",
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({
      email: loginUserDto.email,
    });

    if (!user)
      throw CustomError.notFound(
        "User email not exist, please register the user"
      );

    const isMatching = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const jwtToken = await JwtAdapter.generatedToken({
      id: user.id,
      email: user.email,
    });

    if (!jwtToken)
      throw CustomError.internalServerError("Error while creating jwt token");

    return {
      user: userEntity,
      token: jwtToken,
    };
  }

  private async sendEmailValidationLink(email: string): Promise<boolean>{
    const jwtToken =  await JwtAdapter.generatedToken({email: email});

    if(!jwtToken) throw CustomError.internalServerError("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${jwtToken}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href=${link} >Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options);

    if(!isSent) throw CustomError.internalServerError("Error sending email");

    return true;

  }

  private async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);

    if(!payload) throw CustomError.internalServerError("Invalid Token");

    const {email} = payload as {email: string};

    if(!email) throw CustomError.internalServerError("Email not in token");

    const user = await  UserModel.findOne({email: email});

    if(!user) throw CustomError.internalServerError("Email not exist");

    user.emailValidated = true;

    await user.save();

    return true;

  }
}
