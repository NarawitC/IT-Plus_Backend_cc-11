const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const { User, Client } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.clientSignUp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address = null,
    } = req.body;
    if (!email) {
      createError('Email is required', 400);
    }
    if (!password) {
      createError('Password is required', 400);
    }
    if (password !== confirmPassword) {
      createError('Password did not match', 400);
    }

    const isEmail = validator.isEmail('' + email);
    if (!isEmail) {
      createError('Email is invalid format', 400);
    }
    const isPhoneNumber = validator.isMobilePhone('' + phoneNumber, 'th-TH');
    if (!isPhoneNumber) {
      createError('PhoneNumber is invalid format', 400);
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      role: USER_ROLE.CLIENT,
    });

    const client = await Client.create({
      userId: user.id,
    });

    res.status(201).json({
      message: 'Client created successfully',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.clientSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      createError('Invalid credential', 400);
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      createError('Invalid credential', 400);
    }

    const token = genToken({ userId: user.id, role: user.role });
    res.json({
      message: 'Client signed in successfully',
      token,
    });
  } catch (err) {
    next(err);
  }
};
