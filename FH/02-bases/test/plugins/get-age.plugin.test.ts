import { getAge } from "../../src/plugins/get-age.plugin";

describe("plugins/get-age.plugins.ts", () => {

  test("getAge() should return the age if a person", () => {
    const birthdate =  "1998-11-10";
    const age = getAge(birthdate);

    expect(age).toBe(25);
  });

  test("getAge() should return current age", () => {
    const birthdate = "1998-11-10";
    const age = getAge(birthdate);

    const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

    expect(age).toBe(calculatedAge);
  });

  test("getAge() should return 0 years", () => {
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1998);

    const birthdate = "1998-11-10";
    const age = getAge(birthdate);

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  })

})