import { regularExp } from "../../../config";

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = props;

    if (!email) return ["The field email cannot be null", undefined];
    if (!regularExp.email.test(email)) return ["Email is not valid", undefined];
    if (!password) return ["The field password cannot be null", undefined];
    if (password < 6) return ["Password too short", undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
