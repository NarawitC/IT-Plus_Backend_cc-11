const validator = require('validator');
const fs = require('fs');

const {
  Product,
  Category,
  SubCategory,
  sequelize,
  Property,
} = require('../../models');
const cloudinary = require('../../utils/cloundinary');
const createError = require('../../utils/createError');

exports.createProductPropertyByProductId = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { productId } = req.params;
    const { properties } = req.body;
    if (!properties) {
      createError('Properties is required', 400);
    }
    if (properties.length > 10) {
      createError('Properties must less than 10 property', 400);
    }
    const bulkProperty = [];

    properties.forEach(async (property) => {
      const { topic, description } = property;
      if (!topic) {
        createError('Property topic is required', 400);
      }
      if (topic.length > 30) {
        createError('Property topic is must less than 30 letter', 400);
      }
      if (!description) {
        createError('Property description is required', 400);
      }
      bulkProperty.push({
        topic,
        description,
        productId,
      });
    });
    await Property.bulkCreate(bulkProperty, { transaction });
    await transaction.commit();
    res.status(201).json({
      message: 'Product property created successfully',
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
