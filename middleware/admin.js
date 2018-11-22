module.exports = (req, res, next) => {
    console.log('isSuperAdmin: ' + req.userInfo.isSuperAdmin);
    console.log('isAdmin: ' + req.userInfo.isAdmin);
    console.log('isOwner: ' + req.userInfo.isOwner);
    console.log(req.userInfo);
    if (req.userInfo.isAdmin || req.userInfo.isSuperAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, message: 'Admin credential required.' });
};
