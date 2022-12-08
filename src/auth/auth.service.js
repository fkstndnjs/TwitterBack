import * as userRepository from "../user/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecretKey = "secret";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;
const createToken = (id) => {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};

// 회원가입
export const signup = async (req, res) => {
    const { username, password, name, email } = req.body;
    const user = await userRepository.findByUsername(username);

    // 이미 가입된 유저일 경우
    if (user) {
        return res.status(409).json({ message: `이미 가입된 유저입니다.` });
    }

    // 비밀번호 암호화
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);

    // 유저 데이터 생성
    const createdUser = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
    });

    // 토큰 생성
    const token = createToken(createdUser.id);

    res.status(201).json({ token, username });
};

// 로그인
export const login = async (req, res) => {
    const { username, password } = req.body;

    // username으로 존재하는지 체크
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return res
            .status(401)
            .json({ message: "아이디 혹은 비밀번호가 틀렸습니다." });
    }

    // bcrypt.compare()로 비밀번호 비교
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res
            .status(401)
            .json({ message: "아이디 혹은 비밀번호가 틀렸습니다." });
    }

    // 토큰 생성
    const token = createToken(user.id);

    res.status(200).json({ token, username });
};

// me
export const me = async (req, res) => {
    const user = await userRepository.findById(req.userId);

    if (user) {
        return res
            .status(200)
            .json({ token: req.token, username: user.username });
    }

    res.status(404).json({ message: "유저가 존재하지 않습니다." });
};
