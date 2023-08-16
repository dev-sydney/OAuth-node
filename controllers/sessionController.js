const jwt = require('jsonwebtoken');
const {
  getGoogleOAuthTokens,
  getGoogleUser,
} = require('./../services/UserServices');

const User = require('./../Model/UserModel');
const Session = require('./../Model/SessionModel');

const { response } = require('express');
const { signJwt, verifyJWT } = require('../utils/jwtUtils');

exports.googelOAuthHandler = async (req = Request, res = response, next) => {
  //TODO: Get the code from the qs(on the page the user is navigated to after choosing their google account)
  const { code } = req.query;

  //TODO: Get the id and access token from google with the code
  const { access_token, id_token } = await getGoogleOAuthTokens(code);
  // console.log('ACCESS & ID TOKENS:✅✅✅', { id_token, access_token });

  //TODO: Get the users information with the id token
  //   const googleUser =  jwt.decode(id_token);
  const googleUser = await getGoogleUser(id_token, access_token);

  if (!googleUser.verified_email) {
    return res.status(403).json({
      message: 'Google account is not verified',
    });
  }
  //TODO: Upsert the user and create a session
  let exisitingUser = await User.findOne({
    where: {
      email_address: googleUser.email,
    },
  });
  //TODO: Create the user if they don't exist
  if (!exisitingUser) {
    exisitingUser = await User.create({
      user_name: googleUser.name,
      email_address: googleUser.email,
      user_password: 'test1234',
      picture: googleUser.picture,
    });
    // console.log('UPSERTED USER: ', upsertedUser.toJSON());
  }

  //Create a session
  const session = await Session.create({
    user_agent: req.get('user-agent'),
    user_id: exisitingUser.dataValues.user_id,
  });
  //TODO: Create access & refresh tokens
  const accessToken = signJwt(
    {
      session: session.dataValues.session_id,
      email: exisitingUser.dataValues.email_address,
      name: exisitingUser.dataValues.user_name,
    },
    '120s'
  );
  const refreshToken = signJwt(
    {
      session: session.dataValues.session_id,
      email: exisitingUser.dataValues.email_address,
    },
    '1y'
  );

  //TODO: Set the cookies
  res.cookie('oauthAccessToken', accessToken, {
    maxAge: 300000,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'lax',
  });
  res.cookie('oauthRefreshToken', refreshToken, {
    maxAge: 3.154e10,
    httpOnly: true,
  });

  //TODO: Redirect back to client
  res.status(200).json({ success: true });
};

exports.createUser = async (req, res, next) => {
  const user = await User.create({
    user_name: 'Google Otutey SYdney',
    email_address: 'googleotutey@example.com',
    user_password: 'test1234',
  });
  res.status(200).json({
    user,
  });
};

exports.getUserHandler = async (req, res, next) => {
  // console.log('THE USER:', req.user);
  res.status(200).json({
    user: req.user,
  });
};

exports.deleteSessionHandler = async (req, res, next) => {
  res.cookie('oauthAccessToken', '', {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie('oauthRefreshToken', '', {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({ succcess: true });
};
