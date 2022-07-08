const { PRODUCT_STATUS } = require('../../config/constants');
const {
  Product,
  Category,
  SubCategory,
  Promotion,
  Property,
} = require('../../models');
const { Op } = require('sequelize');

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['categoryName', 'ASC']],
      include: [
        {
          model: SubCategory,
        },
      ],
    });
    categories.forEach((category) => {
      category.SubCategories.sort((a, b) => {
        if (a.subCategoryName < b.subCategoryName) {
          return -1;
        }
        return 1;
      });
    });
    res.status(200).json({
      message: 'Get all category successfully',
      categories,
    });
  } catch (err) {
    next(err);
  }
};
