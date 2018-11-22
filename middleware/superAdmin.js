module.exports = (req, res, next) => {
    if (req.userInfo.isSuperAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, message: 'Super admin credential required.' });
};
