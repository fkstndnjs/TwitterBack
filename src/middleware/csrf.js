import bcrypt from "bcrypt";

const csrf = async (req, res, next) => {
    if (req.method === "GET") {
        return next();
    }

    const csrfHeader = req.get("csrf-token");

    if (!csrfHeader) {
        return res.status(403).json({ message: "CSRF ERROR" });
    }

    const isTrue = await bcrypt.compare("csrf", csrfHeader);

    if (!isTrue) {
        return res.status(403).json({ message: "CSRF ERROR" });
    }

    next();
};

export default csrf;
