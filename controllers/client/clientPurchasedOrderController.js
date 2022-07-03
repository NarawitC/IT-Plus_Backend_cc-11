const {
  Cart,
  CartItem,
  Product,
  Promotion,
  PurchasedOrder,
} = require('../../models');
const { Op } = require('sequelize');

exports.createPurchaseOrder = async (req, res, next) => {
  try {
    console.log('createPurchaseOrder');
    const { orderId } = req.params;
    const { paymentAt, transactionId } = req.body;
    const purchasedOrder = await PurchasedOrder.create({
      orderId,
      paymentAt,
      transactionId,
    });
    res
      .status(200)
      .json({ message: 'Create purchased order successfully', purchasedOrder });
  } catch (error) {
    next(error);
  }
};
