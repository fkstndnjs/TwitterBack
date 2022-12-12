import rateLimiter from "express-rate-limit";

export default rateLimiter({
    windowMs: 10 * 1000,
    max: 10,
    message: "Too Many Request",
});
