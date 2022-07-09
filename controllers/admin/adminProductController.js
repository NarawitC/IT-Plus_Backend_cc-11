const { PRODUCT_STATUS } = require('../../config/constants');
const { Product, Promotion } = require('../../models');

const createError = require('../../utils/createError');

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['productName', 'ASC']],
    });
    res.status(200).json({
      message: 'Get all product successfully',
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: Promotion,
        },
      ],
    });
    res.status(200).json({
      message: 'Get product by id successfully',
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.approveProduct = async (req, res, next) => {
  try {
    const { id: changeStatusAdminId } = req.admin;
    const { productId } = req.params;
    const product = await Product.findOne({
      where: { id: productId },
    });
    if (product.status === PRODUCT_STATUS.PENDING) {
      product.status = PRODUCT_STATUS.APPROVED;
      product.changeStatusAdminId = changeStatusAdminId;
      await product.save();
      res.status(200).json({
        message: 'Approve product successfully',
      });
      return;
    } else {
      res.status(400).json({
        message: 'Product is already approved',
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.approveAllProduct = async (req, res, next) => {
  try {
    const { id: changeStatusAdminId } = req.admin;

    const products = await Product.findAll({
      where: { status: PRODUCT_STATUS.PENDING },
    });
    products.forEach(async (product) => {
      product.status = PRODUCT_STATUS.APPROVED;
      product.changeStatusAdminId = changeStatusAdminId;
      await product.save();
    });
    res.status(200).json({ message: 'Approve all product successfully' });
  } catch (err) {
    next(err);
  }
};

exports.rejectProduct = async (req, res, next) => {
  try {
    const { id: changeStatusAdminId } = req.admin;
    const { productId } = req.params;
    const { rejectReason } = req.body;
    if (!rejectReason) {
      createError('Missing rejectReason', 400);
    }
    const product = await Product.findOne({
      where: { id: productId },
    });
    if (product.status === PRODUCT_STATUS.PENDING) {
      product.status = PRODUCT_STATUS.REJECTED;
      product.changeStatusAdminId = changeStatusAdminId;
      product.rejectReason = rejectReason;
      await product.save();
      res.status(200).json({
        message: 'Reject product successfully',
      });
      return;
    } else {
      res.status(400).json({
        message: 'Product is already rejected',
      });
    }
  } catch (err) {
    next(err);
  }
};
