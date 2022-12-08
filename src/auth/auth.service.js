const jwtSecretKey = "secret";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export const signup = (req, res, next) => {
    const { username, password, name, email } = req.body;
    const user = await;
};

export const login = (req, res, next) => {};
