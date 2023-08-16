const Session = require('../Model/SessionModel');
const User = require('../Model/UserModel');
const { verifyJWT, signJwt } = require('../utils/jwtUtils');

const deserializeUser = async (req, res, next) => {
  const { oauthAccessToken, oauthRefreshToken } = req.cookies;

  const { payload, expired } = await verifyJWT(oauthAccessToken);
  //   console.log('PAYLOAD❗❗', payload);
  if (payload) {
    req.user = payload;
    return next();
  }

  if (expired && !payload) {
    const { payload: refreshPayload } = await verifyJWT(oauthRefreshToken);

    if (!refreshPayload) return next();

    const session = await Session.findOne({
      where: {
        session_id: refreshPayload.session,
      },
    });

    if (!session) return next();

    const user = await User.findOne({
      where: { user_id: session.dataValues.user_id },
    });
    const newAccessToken = signJwt(
      {
        session: session.dataValues.session_id,
        email: user.dataValues.email_address,
        name: user.dataValues.user_name,
      },
      '120s'
    );

    res.cookie('oauthAccessToken', newAccessToken, {
      maxAge: 300000,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'lax',
    });

    req.user = user.dataValues;

    return next();
  }

  return next();
};

module.exports = deserializeUser;
