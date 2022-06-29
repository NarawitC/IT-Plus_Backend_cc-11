const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('../../utils/createError');
const { User, Supplier, sequelize } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address,
      displayName,
      description = null,
      profilePicture = 'https://res.cloudinary.com/narawit/image/upload/v1656510181/IT_Shop/Default%20photo/defaultSupplierProfilePicture_zum06n.png',
      lineId,
      bankName,
      bankAccount,
    } = req.body;
    if (!firstName) {
      createError('First name is required', 400);
    }
    if (!lastName) {
      createError('Last name is required', 400);
    }
    if (!email) {
      createError('Email is required', 400);
    }
    if (!password) {
      createError('Password is required', 400);
    }
    if (password !== confirmPassword) {
      createError('Password did not match', 400);
    }
    if (!address) {
      createError('Address is required', 400);
    }
    const isEmail = validator.isEmail('' + email);
    if (!isEmail) {
      createError('Email is invalid format', 400);
    }
    const isPhoneNumber = validator.isMobilePhone('' + phoneNumber, 'th-TH');
    if (!isPhoneNumber) {
      createError('PhoneNumber is invalid format', 400);
    }
    if (!displayName) {
      createError('DisplayName is required', 400);
    }
    if (description?.length > 400) {
      createError('Description is too longer than 400', 400);
    }
    if (!lineId) {
      createError('LineId is required', 400);
    }
    if (!bankName) {
      createError('BankName is required', 400);
    }
    if (!bankAccount) {
      createError('BankAccount is required', 400);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        address,
        role: USER_ROLE.SUPPLIER,
      },
      { transaction }
    );

    await Supplier.create(
      {
        userId: user.id,
        displayName,
        description,
        profilePicture,
        lineId,
        bankName,
        bankAccount,
      },
      { transaction }
    );

    res.status(201).json({
      message: 'Supplier created successfully',
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
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
      message: 'Supplier signed in successfully',
      token,
    });
  } catch (err) {
    next(err);
  }
};
