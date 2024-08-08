import { register } from "module";
import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailServices: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      await this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: "abc",
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user)
      throw CustomError.notFound("User email not exist, please register user");

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generatedToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating Jwt");

    return {
      user: userEntity,
      token,
    };
  }

  private async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generatedToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href=${link} >Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailServices.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  }

  public async validateEmail(token: string){
    const payload =  await JwtAdapter.validateToken(token);
    if(!payload) throw CustomError.unauthorized("Invalid token");

    const {email} = payload as {email:string};
    if(!email) throw CustomError.internalServer("Email not in token");

    const user  = await UserModel.findOne({email});
    if(!user) throw CustomError.internalServer("Email not exist");

    user.emailValidated = true;
    await user.save();

    return true;
  }
}
