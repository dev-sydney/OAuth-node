import getGoogleOAuthURL from '../utils/GetGoogleOAuthURL';

const Login = () => {
  return (
    <div>
      <h2>Please Login</h2>
      <a href={getGoogleOAuthURL()}>Login with google</a>
    </div>
  );
};

export default Login;
