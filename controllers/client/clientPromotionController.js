const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
  Supplier,
  Promotion,
} = require('../../models');
const { Op } = require('sequelize');

exports.getApprovedPromotionProduct = async (req, res, next) => {
  try {
    const promotionProducts = await Promotion.findAll({
      where: { status: PRODUCT_STATUS.APPROVED },
      include: [
        {
          model: Product,
          include: [
            { model: Category },
            { model: SubCategory },
            { model: Supplier },
          ],
        },
      ],
      order: [['productName', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all approved promotion  product successfully',
      promotionProducts,
    });
  } catch (err) {
    next(err);
  }
};
