import { characters } from "../../src/js-foundation/02-destructuring";

describe("js-foundation/02-destructuring" , () => {

  test("Characte should containt Flash, Superman", () => {

    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");

  })

  test("First character should be flash, and second Superman", () => {

    const [ flash, superman] = characters;

    expect(flash).toBe("Flash");
    expect(superman).toBe("Superman");
  
  })

})