const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, Admin } = require('../models/index');
const createError = require('../utils/createError');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.userSignup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address = null,
      addressDescription = null,
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
    await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      addressDescription,
    });

    res.status(201).json({ text: 'User created' });
  } catch (err) {
    next(err);
  }
};

exports.userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      createError('invalid credential', 400);
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      createError('invalid credential', 400);
    }

    const token = genToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.adminSignup = async (req, res, next) => {
  try {
    const { employeeId, email, password, confirmPassword } = req.body;
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

    const hashedPassword = await bcryptjs.hash(password, 12);
    await Admin.create({
      employeeId,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ text: 'Admin created' });
  } catch (err) {
    next(err);
  }
};

exports.adminSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({
      where: { email },
    });

    if (!admin) {
      createError('invalid credential', 400);
    }

    const isMatch = await bcryptjs.compare(password, admin.password);
    if (!isMatch) {
      createError('invalid credential', 400);
    }

    const token = genToken({ id: admin.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
