const config = require('config');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());

    // App Secret can be retrieved from the App Dashboard
    // const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? process.env.MESSENGER_APP_SECRET : config.get('appSecret');

    // Arbitrary value used to validate a webhook
    // const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ? (process.env.MESSENGER_VALIDATION_TOKEN) : config.get('validationToken');

    // Generate a page access token for your page from the App Dashboard
    // const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ? (process.env.MESSENGER_PAGE_ACCESS_TOKEN) : config.get('pageAccessToken');

    // URL where the app is running (include protocol). Used to point to scripts and
    // assets located at this address.
    // const SERVER_URL = (process.env.SERVER_URL) ? (process.env.SERVER_URL) : config.get('serverURL');

    // const JWT_PRIVATE_KEY = (process.env.jwtPrivateKey) ? (process.env.jwtPrivateKey) : config.get('jwtPrivateKey');

    // if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL && JWT_PRIVATE_KEY)) {
    //     console.error("Missing config values");
    //     throw new Error('Missing config values');
    //     process.exit(1);
    // }
};