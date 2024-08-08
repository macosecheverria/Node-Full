import { CustomError } from "../errors/custom-error";

export class UserEntity {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly email_validated: boolean,
    public readonly password: string,
    public readonly role: string[],
    public readonly img?: string
  ) {}

  static fromObject(props: { [key: string]: any }): UserEntity {
    const { id, name, email, email_validated, password, role } = props;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (email_validated === undefined)
      throw CustomError.badRequest("Missing emailValidated");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(id, name, email, email_validated, password, role);
  }
}
