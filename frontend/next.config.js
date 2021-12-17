/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(path.resolve(), "..", ".env") });

module.exports = {
    reactStrictMode: true,

    env: {
        JWT_AUTH_HEADER_PREFIX: process.env.JWT_AUTH_HEADER_PREFIX,
        NEXT_URL: process.env.NEXT_URL,
        DJANGO_URL: process.env.DJANGO_URL,
    },
};
