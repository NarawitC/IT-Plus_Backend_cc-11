const { Product, Category, SubCategory, Promotion } = require('../../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['name', 'ASC']],
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Property },
        { model: Promotion },
      ],
    });
    res.status(200).json({
      meessage: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
