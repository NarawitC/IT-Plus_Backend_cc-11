const { Product } = require('../../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
