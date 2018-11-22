const testSuperAdminResourceInfo = async (req, res, next) => {
    return res.status(200).json({ success: true, message: 'SuperAdmin resource.' });
};

module.exports = {
    testSuperAdminResourceInfo,
};

