const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/index');
const createError = require('../utils/createError');

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, emailOrPhone, password, confirmPassword } =
      req.body;
    if (!emailOrPhone) {
      createError('Email or phone number is required', 400);
    }
    if (!password) {
      createError('Password is required', 400);
    }
    if (password !== confirmPassword) {
      createError('Password did not match', 400);
    }

    const isMobilePhone = validator.isMobilePhone('' + emailOrPhone);
    const isEmail = validator.isEmail('' + emailOrPhone);
    if (!isEmail && !isMobilePhone) {
      createError('Email or phone number is invalid format', 400);
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email: isEmail ? emailOrPhone : null,
      phoneNumber: isMobilePhone ? emailOrPhone : null,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
