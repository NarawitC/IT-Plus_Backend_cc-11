const { Cart } = require('../../models');
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
