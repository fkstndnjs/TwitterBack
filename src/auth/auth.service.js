import * as userRepository from "../user/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config.js";

const createToken = (id) => {
    return jwt.sign({ id }, config.jwtSecretKey, {
        expiresIn: config.jwtExpires,
    });
};

// 회원가입
export const signup = async (req, res) => {
    const { username, password, name, email } = req.body;

    // 이미 가입된 유저일 경우
    const user = await userRepository.findByUsername(username);

    if (user) {
        return res.status(409).json({ message: `이미 가입된 유저입니다.` });
    }

    // 비밀번호 암호화
    const hashed = await bcrypt.hash(password, config.bcryptSaltRounds);

    // 유저 데이터 생성
    const createdUserId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
    });

    // 토큰 생성
    const token = createToken(createdUserId);

    res.status(201).json({ token, username });
};

// 로그인
export const login = async (req, res) => {
    const { username, password } = req.body;

    // username을 가진 유저가 있는지 확인
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return res
            .status(401)
            .json({ message: "아이디 혹은 비밀번호가 틀렸습니다." });
    }

    // bcrypt.compare()로 암호화 된 비밀번호와 비교
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

// csrf
export const csrfToken = async (req, res) => {
    const csrfToken = await bcrypt.hash("csrf", 1);

    res.status(200).json({ csrfToken });
};
