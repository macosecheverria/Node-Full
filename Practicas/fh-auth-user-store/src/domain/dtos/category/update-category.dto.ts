export class UpdateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateCategoryDto?] {
    const { name, available } = props;

    if (!name) return ["Name is required"];
    if (name.length < 6) return ["Name too short"];
    if (!available) return ["Available is required"];
    if (typeof available !== "boolean") return ["Available must be a boolean"];

    return [undefined, new UpdateCategoryDto(name, available)];
  }
}
