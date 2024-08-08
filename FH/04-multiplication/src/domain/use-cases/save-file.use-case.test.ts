import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("save-file.use-case.test.ts", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custiom-table-name",
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const outputsFolderExist = fs.existsSync("outputs");
    if (outputsFolderExist) fs.rmSync("outputs", { recursive: true });

    const customOutputsFoldeExist = fs.existsSync(
      customOptions.fileDestination
    );

    if (customOutputsFoldeExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);

    expect(result).toBe(true);

    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExist = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSync = jest.spyOn(fs, "mkdir").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    mkdirSync.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writing error message");
      });

    const result = saveFile.execute({ fileContent: "Hola" });

    expect(result).toBe(false);
    writeFileSync.mockRestore();
  });
});
