const { Supplier, User } = require('../../models/index');

const { USER_ROLE } = require('../../config/constants');
const createError = require('../../utils/createError');

exports.getAllSupplier = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: USER_ROLE.SUPPLIER },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Supplier,
        },
      ],
    });
    res.status(200).json({
      message: 'Get all supplier successfully',
      users,
    });
  } catch (error) {
    next(error);
  }
}
