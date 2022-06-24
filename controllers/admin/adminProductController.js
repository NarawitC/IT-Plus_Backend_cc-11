const { Product } = require('../../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json({
      meessage: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
