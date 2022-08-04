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
    const promotionProducts = await Promotion.findAll({
      include: [
        {
          model: Product,
          where: { status: PRODUCT_STATUS.APPROVED },
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
