import { NextFunction, Request, Response } from "express";
import { CustomError, UserEntity } from "../../domain";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";

export class AuthMiddleware {
  static async jwtValidated(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ error: "Token not provided" });
    }

    if (!authorization.startsWith("Bearer")) {
      return res.status(401).json({ error: "Invalid Bearer token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validatedToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const user = await prisma.user.findFirst({
        where: { id: +payload.id },
      });

      if (!user) return res.status(401).json({ error: "Invalid  user token" });

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("Internal Server Error");
    }
  }
}
