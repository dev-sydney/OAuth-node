/**
 * Creates the Link to navigate the user to the
 * consent page
 * @returns Link to the consent screen.
 */
const getGoogleOAuthURL = () => {
  const rootURL = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);

  return `${rootURL}?${qs.toString()}`;
};

export default getGoogleOAuthURL;
