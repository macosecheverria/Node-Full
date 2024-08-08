import { emailRegExp } from "../../../config";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = props;
    if (!email) return ["Email is required"];
    if (!emailRegExp.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Password is required"];
    if (password.length <= 5) return ["Password too short"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
