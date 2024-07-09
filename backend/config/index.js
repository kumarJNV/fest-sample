const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const BUCKET_NAME = '';
const ACCESS_KEY_ID = '';
const SECRET_ACCESS_KEY = '';
const CLOUD_FRONT_URL = '';
const FRONTEND_URL = '';


module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING,
    BUCKET_NAME,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    CLOUD_FRONT_URL,
    FRONTEND_URL
};