import { emailRegExp } from "../../../config";

export class UpdateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email } = props;

    if (!name) return ["Name is required"];
    if (name < 3) return ["Name too short"];
    if (!email) return ["Email is required"];

    if (!emailRegExp.email.test(email)) return ["Email invalid"];

    return [undefined, new UpdateUserDto(name, email)];
  }
}
