const { Cart, Order, OrderItem, CartItem, sequelize } = require('../../models');
const { Op } = require('sequelize');

exports.bulkCreateOrderWithOrderItem = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      Client: { id: clientId },
    } = req.user;
    const { orders } = req.body;
    const { cartId } = req.params;

    orders.map((order) => {
      order.clientId = clientId;
    });

    Cart.destroy({ where: { id: cartId } }, { transaction });

    const bulkOrder = await Order.bulkCreate(orders, { transaction });
    const plainBulkOrder = JSON.parse(JSON.stringify(bulkOrder));
    const orderItemsForBulkCreate = [];
    plainBulkOrder.map((order) => {
      const orderFromOrders = orders.find(
        (o) => o.supplierId === order.supplierId
      );
      const orderItems = orderFromOrders.orderItems;
      orderItems.map((orderItem) => {
        orderItem.orderId = order.id;
        orderItemsForBulkCreate.push(orderItem);
      });
    });

    const bulkOrderItem = await OrderItem.bulkCreate(orderItemsForBulkCreate, {
      transaction,
    });

    await transaction.commit();
    res.status(200).json({
      message: 'Successfully created order',
      bulkOrder,
      bulkOrderItem,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
