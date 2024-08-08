import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto, UpdateUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [errorDto, registerDto] = RegisterUserDto.create(req.body);

    if (errorDto) return res.status(400).json({ error: errorDto });

    return this.authService
      .registerUser(registerDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handlerError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [errorDto, loginDto] = LoginUserDto.create(req.body);

    if (errorDto) return res.status(400).json({ errorDto });

    this.authService
      .loginUser(loginDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handlerError(error, res));
  };

  findAll = (req: Request, res: Response) => {
    this.authService.findAll().then((user) => res.status(200).json(user));
  };

  findById = (req: Request, res: Response) => {
    const id = +req.params.id;
    return this.authService
      .findById(id)
      .then((user) => res.status(200).json(user))
      .catch(error => this.handlerError(error, res));
  };

  update = (req: Request, res: Response) => {
    const [errorDto, updateDto] = UpdateUserDto.create(req.body);

    if(errorDto) return res.status(400).json({error: errorDto});

    const id = +req.params.id;

    return this.authService.update(id, updateDto!)
      .then(user => res.status(200).json(user))
      .catch(error => this.handlerError(error, res));
  }

  remove = (req:Request, res:Response) => {
    const id = +req.params.id;

    return this.authService.remove(id)
      .then(user => res.status(200).json("User Removed"))
      .catch(error => this.handlerError(error, res));
  }

  private handlerError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
