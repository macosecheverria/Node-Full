"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMakePerson = void 0;
const buildMakePerson = ({ getAge, getUUID, }) => {
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate),
        };
    };
};
exports.buildMakePerson = buildMakePerson;
