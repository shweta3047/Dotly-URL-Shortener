const { baseURL } = require("./dev");

module.exports={
    MONGOURI:process.env.MONGOURI,
    JWT_SERCRET:process.env.JWT_SERCRET,
    baseURL:process.env.baseURL
}