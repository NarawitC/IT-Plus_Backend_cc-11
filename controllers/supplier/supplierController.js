const { User, Supplier } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

exports.getSupplierInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
        where: { id: req.user.id, role: USER_ROLE.SUPPLIER },
      },
      include: [{ model: Supplier }],
    });
    if (!user) {
      createError('You are unauthorize', 404);
    }
    res.status(200).json({
      message: 'Get supplier info successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};
