const testAdminResourceInfo = async (req, res, next) => {
    return res.status(200).json({ success: true, message: 'Admin resource.' });
};

module.exports = {
    testAdminResourceInfo,
};
