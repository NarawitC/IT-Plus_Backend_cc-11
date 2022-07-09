const {
  Supplier,
  PurchasedOrder,
  Balance,
  Transaction,
  Order,
  sequelize,
} = require('../../models');
const createError = require('../../utils/createError');

exports.getBalanceBySupplierId = async (req, res, next) => {
  try {
    const {
      Supplier: { id: supplierId },
    } = req.user;

    const balance = await Balance.findOne({
      where: { supplierId: supplierId },
    });
    if (!balance) {
      createError('balance not found', 400);
    }
    res.json({ balance: balance });
  } catch (err) {
    next(err);
  }
};
