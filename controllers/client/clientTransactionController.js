const {
  Supplier,
  PurchasedOrder,
  Balance,
  Transaction,
  Order,
  sequelize,
} = require('../../models');

exports.createTransferToSupplier = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { supplierId, productPrice, orderId } = req.body;

    const transaction = await Transaction.create(
      {
        description: `รายรับจาก order id : ${orderId}`,
        type: 'TRANSFER',
        netAmount: +productPrice * 0.9,
        status: 'COMPLETED',
        fee: 0,
      },
      { transaction: t }
    );

    const balance = await Balance.findOne({
      where: { supplierId: supplierId },
    });
    if (!balance) {
      await Balance.create({
        balance: +productPrice * 0.9,
      });
    }
    if (balance) {
      balance.balance = +balance.balance + +productPrice * 0.9;
      await balance.save({ transaction: t });
    }
    await t.commit();
    res.status(200).json({
      message: 'Transfer and update supplier balance completed',
      transaction,
      balance,
    });
  } catch (err) {
    next(err);
  }
};
