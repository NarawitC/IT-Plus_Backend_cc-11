const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
  Supplier,
} = require('../../models');
const { Op } = require('sequelize');

exports.getApprovedPromotionProduct = async (req, res, next) => {
  try {
    const presentDate = new Date();
    const promotion = await Promotion.findAll({
      where: {
        startedAt: { [Op.lte]: presentDate },
        endedAt: { [Op.gte]: presentDate },
      },
    });
    const productIds = promotion.map((item) => item.productId);
    const promotionProducts = await Product.findAll({
      where: { id: productIds, status: PRODUCT_STATUS.APPROVED },
      include: [
        { model: Category },
        { model: SubCategory },
        { model: Promotion },
        {
          model: Supplier,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    res.status(200).json({
      message: 'Get all approved promotion product successfully',
      promotionProducts,
    });
  } catch (err) {
    next(err);
  }
};
