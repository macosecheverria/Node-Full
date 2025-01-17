import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.status(200).json(user));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.status(200).json(user));
  };
}
