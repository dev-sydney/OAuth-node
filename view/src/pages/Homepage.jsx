import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Homepage = () => {
  const shouldMakeAPICall = useRef(true);
  const [shouldNavigateToWelcome, setShouldNavigateToWelcome] = useState(false);

  useEffect(() => {
    if (shouldMakeAPICall.current) {
      shouldMakeAPICall.current = false;

      fetch(
        `/api/v1/sessions/oauth/google/${location.search.split('&')[0]}`
      ).then(res => {
        if (res.status === 200) {
          setShouldNavigateToWelcome(true);
        }
      });
    }
  }, []);

  if (shouldNavigateToWelcome) return <Navigate to={'/welcome'} />;
  return <div></div>;
};

export default Homepage;
