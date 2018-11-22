module.exports = (req, res, next) => {
    if (req.userInfo.isOwner || req.userInfo.isAdmin || req.userInfo.isSuperAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, message: 'Owner credential required.' });
};
