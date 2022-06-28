const validator = require('validator');

const { Category, Product } = require('../../models/index');

const createError = require('../../utils/createError');

exports.createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      createError('Category Name is required', 400);
    }
    const category = await Category.create({
      categoryName,
    });
    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};
