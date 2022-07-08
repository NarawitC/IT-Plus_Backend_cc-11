const { SubCategory, Product } = require('../../models/index');

const createError = require('../../utils/createError');

exports.createSubCategory = async (req, res, next) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    if (!subCategoryName) {
      createError('Subcategory name is required', 400);
    }
    if (!categoryId) {
      createError('Category is required', 400);
    }

    const subCategory = await SubCategory.create({
      subCategoryName,
      categoryId,
    });
    res.status(201).json({
      message: 'SubCategory created successfully',
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};
