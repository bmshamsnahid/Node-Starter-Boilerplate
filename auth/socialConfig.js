// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: '1983962575025799', // your App ID
    clientSecret: '366388821be82902c88fd208201f5344', // your App Secret
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    profileFields: ['id', 'email', 'name'], // For requesting permissions from Facebook API
  },
  googleAuth: {
    clientID: '712484528890-0po4vjnts4hpjus6inotpvotgrdt0vv6.apps.googleusercontent.com',
    clientSecret: 'XRGEnwAwreUp-137LBD72qWX',
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
};
