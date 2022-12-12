import rateLimiter from "express-rate-limit";

export default rateLimiter({
    windowMs: 10 * 1000,
    max: 10,
    message: "요청이 너무 많습니다.",
    handler: (req, res, next, options) => {
        console.log("options.statusCode -", options.statusCode);
        console.log("options.message -", options.message);

        res.status(options.statusCode).send(options.message);
    },
});
