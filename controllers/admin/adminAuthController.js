const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const { Admin } = require('../../models');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.adminSignUp = async (req, res, next) => {
  try {
    const { employeeId, password, confirmPassword, role } = req.body;
    if (!password) {
      createError('Password is required', 400);
    }
    if (password !== confirmPassword) {
      createError('Password did not match', 400);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    await Admin.create({
      employeeId,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'Admin created successfully',
    });
  } catch (err) {
    next(err);
  }
};
