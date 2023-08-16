const { default: axios } = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();
/**
 * This function makes requests to the google oauth server to get the access tokens & ids
 * @param {Sting} code
 */
exports.getGoogleOAuthTokens = async code => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_ID_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
  };
  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    return res.data;
  } catch (err) {
    console.log(
      'Failed to fetch google Oauth tokens❗❗❗',
      err.response.data.error
    );
  }
};
/**
 * Gets the google user info with the access token & id token
 * @param {String} id_token
 * @param {String} access_token
 * @returns
 */
exports.getGoogleUser = async (id_token, access_token) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
  try {
    const res = await axios.get(url, {
      headers: {
        //NOTE: The id_token is used to verify that we are who we say we are
        //NOTE: Acess token is used get the user info
        Authorization: `Bearer ${id_token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(`FAILED TO GET USER INFO ❗❗❗`, err.response.data.error);
  }
};
