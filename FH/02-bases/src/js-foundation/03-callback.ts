interface User {
  id: number;
  name: string;
}

const users: User[]  = [
  {
    id: 1,
    name: "John doe"
  },

{
  id: 2,
  name: "Jane doe"
}
];


export const getUserById = (id: number, callback : (err?: string, user? : User) => void) => {
  const user = users.find(el => el.id === id );

  if(!user){
    return callback(`User not found with id ${id}`);
  }

  return callback(undefined, user);
}
