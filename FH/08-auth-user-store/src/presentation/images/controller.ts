import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export class ImagesController {
  constructor() {}

  public getImage = (req: Request, res: Response) => {
    const { type = "", img = "" } = req.params;

    const imagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );

    console.log(imagePath);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.status(200).sendFile(imagePath);
  };
}
