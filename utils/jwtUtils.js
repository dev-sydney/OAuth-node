const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

dotenv.config({ path: './../' });

exports.signJwt = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

exports.verifyJWT = async token => {
  try {
    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    return { payload: decodedPayload, expired: false };
  } catch (err) {
    return { payload: null, expired: err.message.includes('jwt expired') };
  }
};
