interface BuidMakerPersonOptions {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface PersonOptions {
  name: string;
  birthdate: string;
}

export const buildMakePerson = ({
  getAge,
  getUUID,
}: BuidMakerPersonOptions) => {
  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
};
