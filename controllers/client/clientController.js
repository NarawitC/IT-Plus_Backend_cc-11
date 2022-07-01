const { User, Client } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

exports.getMyInfo = async (req, res, next) => {
  try {
    console.log(USER_ROLE.CLIENT);
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { id: req.user.id, role: USER_ROLE.CLIENT },
      include: [{ model: Client }],
    });
    if (!user) {
      createError('You are unauthorize', 404);
    }
    res.status(200).json({
      message: 'Get client info successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMyInfo = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address,
    } = req.body;

    if (email) {
      const isEmail = validator.isEmail('' + email);
      if (!isEmail) {
        createError('Email is invalid format', 400);
      }
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        createError('Password did not match', 400);
      }
    }

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 12);
      password = hashedPassword;
    }

    if (phoneNumber) {
      const isPhoneNumber = validator.isMobilePhone('' + phoneNumber, 'th-TH');
      if (!isPhoneNumber) {
        createError('PhoneNumber is invalid format', 400);
      }
    }

    const updated = await User.update(
      {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        address,
      },
      {
        where: { id: req.user.id },
      }
    );

    if (updated[0] === 0) {
      createError('You are unauthorize', 404);
    }

    res.status(200).json({
      message: 'Update client info successfully',
    });
  } catch (err) {
    next(err);
  }
};
