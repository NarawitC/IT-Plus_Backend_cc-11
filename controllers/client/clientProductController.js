const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
} = require('../../models');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Property },
        { model: Promotion },
      ],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};
