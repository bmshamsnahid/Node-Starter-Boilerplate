const request = require('request');

module.exports = (obj) => {
    return new Promise((resolve, reject) => {
        request(obj, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const recipientId = body.recipient_id;
                const messageId = body.message_id;

                if (messageId) {
                    console.log("Successfully sent message with id %s to recipient %s",
                        messageId, recipientId);
                } else {
                    console.log("Successfully called Send API for recipient %s",
                        recipientId);
                    resolve(body);
                }
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
                reject(error);
            }
        });
    });
};