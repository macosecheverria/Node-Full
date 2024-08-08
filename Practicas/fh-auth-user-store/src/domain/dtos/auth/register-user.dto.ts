import { emailRegExp } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = props;

    if (!name) return ["The field name is required"];
    if (name.lenght <= 3) return ["The field name too short"];
    if (!email) return ["The field email is required"];
    if (!emailRegExp.email.test(email)) return ["Email is not valid"];
    if (!password) return ["The field password is required"];
    if (password.lenght <= 6) return ["The field password too short"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
