const testOwnerResourceInfo = async (req, res) => res.status(200).json({ success: true, message: 'Owner resource.'});

module.exports = {
  testOwnerResourceInfo,
};
