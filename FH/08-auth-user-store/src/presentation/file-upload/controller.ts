import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handlerError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }

  uploadFiles = (req: Request, res: Response) => {
    const type = req.params.type;

    const validType = ["users", "categories", "products"];

    if (!validType.includes(type)) {
      return res
        .status(400)
        .json({ error: `Invalid type,${type}, valid ones ${validType} ` });
    }

    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService
      .uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.status(200).json(uploaded))
      .catch((error) => this.handlerError(error, res));
  };

  uploadMultiplesFiles = (req: Request, res: Response) => {
    const type = req.params.type;

    console.log(type);

    const files = req.body.files as UploadedFile[];

    return this.fileUploadService
      .uploadMultiple(files, `uploads/${type}`)
      .then((upload) => res.status(200).json(upload))
      .catch((error) => this.handlerError(error, res));
  };
}
