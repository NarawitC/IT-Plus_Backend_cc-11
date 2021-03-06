const { CartItem } = require('../../models');
const { Op } = require('sequelize');

exports.createCartItem = async (req, res, next) => {
  try {
    const { cartId, cartItems } = req.body;
    cartItems.map((cartItem) => {
      cartItem.cartId = cartId;
    });
    const bulkCartItem = await CartItem.bulkCreate(cartItems);
    res.status(200).json({
      message: 'Create cart item successfully',
      bulkCartItem,
    });
  } catch (error) {
    next(error);
  }
};
