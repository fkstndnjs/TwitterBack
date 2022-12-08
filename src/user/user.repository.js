import bcrypt from "bcrypt";

let users = [
    {
        createdAt: new Date().toLocaleString(),
        id: 1,
        username: "ysh",
        password: bcrypt.hashSync("yshysh", 12),
        name: "SeokHyun Yu",
        email: "fkstndnjs@naver.com",
    },
];

export const findByUsername = async (username) => {
    return users.find((user) => user.username === username);
};

export const findById = async (id) => {
    return users.find((user) => user.id === id);
};

export const createUser = async (user) => {
    const createdUser = { id: users[users.length - 1]?.id + 1 || 1, ...user };

    users.push(createdUser);

    return createdUser;
};
