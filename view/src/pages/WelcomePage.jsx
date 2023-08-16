import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
  const shouldMakeAPICall = useRef(true);
  const [userName, setUserName] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (shouldMakeAPICall.current) {
      shouldMakeAPICall.current = false;

      fetch(`/api/v1/sessions/users`)
        .then(userDataResponse => {
          if (userDataResponse.status === 200) {
            return userDataResponse.json();
          } else {
            throw new Error('Invalid user');
          }
        })
        .then(jsonResponse => setUserName(jsonResponse.user.name))
        .catch(err => {
          console.log(err);
        });
    }
    //eslint-disable-next-line
  }, []);

  const onButtonClickHandler = () => {
    fetch('/api/v1/sessions/users', { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) navigateTo('/login');
      })
      .catch(err => {
        setAlertMessage('Trouble logging out, please refresh and try again.');
        console.log(err);
      });
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>{alertMessage && alertMessage}</h1>
      <h1>Hello {userName && userName}</h1>

      <div>
        <button onClick={onButtonClickHandler}>LOGOUT</button>
      </div>
    </div>
  );
};

export default WelcomePage;
