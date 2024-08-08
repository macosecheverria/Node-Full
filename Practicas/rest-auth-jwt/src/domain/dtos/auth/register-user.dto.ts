import { regularExp } from "../../../config";

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = props;
    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing email", undefined];
    if (!regularExp.email.test(email)) return ["Email is not valid", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
