import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("js-foundation/05-factory", () => {
  const getUUID = () => "12345";
  const getAge = () => 35;

  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({ getUUID, getAge });

    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person", () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    const johnDoe = makePerson({ name: "John doe", birthdate: "1998-11-10" });

    expect(johnDoe).toEqual({
      id: "12345",
      name: "John doe",
      birthdate: "1998-11-10",
      age: 35,
    });
  });
});
