const { Promotion } = require('../../models/index');

const createError = require('../../utils/createError');

exports.createPromotion = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { discount, startAt, endedAt } = req.body;
    const promotion = await Promotion.create({
      productId,
      discount,
      startAt,
      endedAt,
    });
    res.status(201).json({
      message: 'Create promotion successfully',
      promotion,
    });
  } catch (error) {
    next(error);
  }
};
