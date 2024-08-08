export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDto?] {
    
    if (isNaN(page)) return ["Page must be numbers", undefined];
    if (isNaN(limit)) return ["Limit must be numbers", undefined];
    if (page <= 0) return ["Page must be greater than 0"];
    if (limit <= 0) return ["Limit must be greater than 0"];

    return [undefined, new PaginationDto(page, limit)];
  }
}
