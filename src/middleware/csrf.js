export const csrfCheck = (req, res, next) => {
    if (req.method === "GET") {
        return next();
    }
};
