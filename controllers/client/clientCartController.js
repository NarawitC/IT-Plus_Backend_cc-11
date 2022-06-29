const { Cart, CartItem, Product, Promotion } = require('../../models');
const { Op } = require('sequelize');

exports.createCart = async (req, res, next) => {
  try {
    const {
      Client: { id: clientId },
    } = req.user;
    const cart = await Cart.create({
      clientId,
    });
    res.status(200).json({
      message: 'Create cart successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCart = async (req, res, next) => {
  try {
    const {
      Client: { id: clientId },
    } = req.user;
    const carts = await Cart.findAll({
      where: {
        clientId,
      },
      include: [
        {
          model: CartItem,
          include: [{ model: Product, include: [{ model: Promotion }] }],
        },
      ],
    });
    res.status(200).json({
      message: 'Get all cart successfully',
      carts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
      include: [
        {
          model: CartItem,
          include: [{ model: Product, include: [{ model: Promotion }] }],
        },
      ],
    });
    res.status(200).json({
      message: 'Get cart successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};
