const { OMISE } = require('../../config/constants');
const omise = require('omise')({
  publicKey: OMISE.PUBLIC_KEY,
  secretKey: OMISE.SECRET_KEY,
});

exports.checkoutCreditCard = async (req, res, next) => {
  try {
    const { clientId, totalPrice, token } = req.body;
    const customer = await omise.customers.create({
      name: clientId,
      card: token,
    });

    const charge = await omise.charges.create({
      amount: (totalPrice * 100).toFixed(0),
      currency: 'thb',
      customer: customer.id,
    });
    // console.log('Charge -->', charge);

    res.status(200).json({
      message: 'Checkout successfully',
      amount: totalPrice.toFixed(2),
      status: charge.status,
      paymentAt: charge.paid_at,
      transactionId: charge.id,
    });
  } catch (err) {
    next(err);
  }
};
