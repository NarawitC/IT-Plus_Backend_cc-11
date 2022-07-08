const {
  Supplier,
  PurchasedOrder,
  Balance,
  Transaction,
  Order,
  sequelize,
} = require('../../models');

const clientTransactionController = require('../../controllers/client/clientTransactionController');

router.post(
  '/createTransfer',
  clientTransactionController.createTransferToSupplier
);

module.exports = router;
