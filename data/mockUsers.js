import bcrypt from "bcrypt"


export const users = [
    {
        id: 1,
        username: "john",
        passwordHash: bcrypt.hashSync("john123", 10)        
    },
    {
        id: 2,
        username: "steward",
        passwordHash: bcrypt.hashSync("steward123", 10)
    }
];

let nextId = 3;

export const getNextUserId = () => nextId++;