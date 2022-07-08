const {
  Supplier,
  PurchasedOrder,
  Balance,
  Transaction,
  Order,
  sequelize,
} = require('../../models');

exports.getAllTransactionsBySupplierId = async (req, res, next) => {
  try {
    const {
      Supplier: { id: supplierId },
    } = req.user;
    console.log(supplierId);
    const transactions = await Transaction.findAll({
      where: { supplierId: supplierId },
      include: [{ model: PurchasedOrder, include: [{ model: Order }] }],
    });
    res.status(200).json({
      message: 'Get all transaction successfully',
      transactions,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findOne({
      where: { id: transactionId },
    });
    if (!transaction) {
      createError('transaction not found', 400);
    }
    res.json({ transaction: transaction });
  } catch (err) {
    next(err);
  }
};

exports.createWithdrawalTransaction = async (req, res, next) => {
  try {
    const {
      Supplier: { id: supplierId },
    } = req.user;
    // console.log(supplierId);
    const { description, withdrawalAmount, fee = 0 } = req.body;

    if (!withdrawalAmount) {
      createError('Please insert withdrawal amount', 400);
    }
    const transaction = await Transaction.create({
      description,
      type: 'WITHDRAWAL',
      netAmount: withdrawalAmount,
      status: 'COMPLETED',
      fee,
    });
    // const {
    //   Supplier: { id: supplierId },
    // } = req.user;
    const balance = await Balance.findOne({
      where: { supplierId: supplierId },
    });

    if (balance) {
      if (+balance.balance - +withdrawalAmount < 0) {
        createError('Your withdrawal amount exceeds your balance', 400);
      }
      balance.balance = +balance.balance - +withdrawalAmount;
      await balance.save({ transaction: t });
    }

    res.status(200).json({
      message: 'Withdrawal and update supplier balance completed',
      transaction,
    });
  } catch (err) {
    next(err);
  }
};
