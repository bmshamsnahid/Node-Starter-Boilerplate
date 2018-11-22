module.exports = (err, req, res, next) => {
    console.log (new Error(err.message));
    return res.status(500).send('Internal server error.');
};