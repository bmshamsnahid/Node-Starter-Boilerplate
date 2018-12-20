const testSuperAdminResourceInfo = async (req, res) => res.status(200).json({ success: true, message: 'SuperAdmin resource.' });

module.exports = {
  testSuperAdminResourceInfo,
};
