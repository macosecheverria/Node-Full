import { getUserById } from "../../src/js-foundation/03-callback";

describe("js-foundation/03-callback", () => {

  test("getUserById should return an error if user does not exist" ,(done) => {

    const id = 10;
    getUserById(id, (err, user) => {

      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();
      done();

    })
  })


  test("getUserById should return id 1 with name John doe", () => {

    const id = 1;

    getUserById(id, (err,user) => {

      expect(err).toBeUndefined();
      expect(user).toStrictEqual({id: 1, name: "John doe"});

    })

  }) 

})