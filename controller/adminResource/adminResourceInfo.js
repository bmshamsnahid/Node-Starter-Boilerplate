const testAdminResourceInfo = async (req, res) => res.status(200).json({ success: true, message: 'Admin resource.' });

module.exports = {
  testAdminResourceInfo,
};
