import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { resolveHostname } from "nodemailer/lib/shared";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const autorization = req.header("Authorization");

    if (!autorization)
      return res.status(401).json({ error: "No token provided" });

    if (!autorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = autorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const user = await UserModel.findById(payload.id);

      if (!user) return res.status(401).json({ error: "Invalid user - token" });

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
