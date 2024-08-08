"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const users = [
    {
        id: 1,
        name: "John doe"
    },
    {
        id: 2,
        name: "Jane doe"
    }
];
const getUserById = (id, callback) => {
    const user = users.find(el => el.id === id);
    if (!user) {
        return callback(`User not found with id ${id}`);
    }
    return callback(undefined, user);
};
exports.getUserById = getUserById;
