const { Admin } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

exports.getMyInfo = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { id: req.admin.id },
    });
    if (!admin) {
      createError('You are unauthorize', 404);
    }
    res.status(200).json({ message: 'Get admin info successfully', admin });
  } catch (err) {
    next(err);
  }
};
