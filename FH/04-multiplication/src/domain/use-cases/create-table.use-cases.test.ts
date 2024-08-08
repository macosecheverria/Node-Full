import {CreateTable} from "./create-table.use-cases"

describe("create-table.use-cases.test.ts", () => {

  test("should create table with default values", () => {

    const createTable = new CreateTable();
    const table = createTable.execute({base: 5});
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("5 X 1 = 5");
    expect(table).toContain("5 X 10 = 50");
    expect(rows).toBe(10);

  });

  test("should create table with custom values",() => {

    const createTable = new CreateTable();

    const options = {
      base:3,
      limit: 20
    }

    const table = createTable.execute(options);
    const rows = table.split("\n").length;

    expect(table).toContain("3 X 2 = 6");
    expect(table).toContain("3 X 10 = 30");
    expect(table).toContain("3 X 20 = 60");
    expect(rows).toBe(options.limit);
    

  })

})