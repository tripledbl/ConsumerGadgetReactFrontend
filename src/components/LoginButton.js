import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

const MODEL_PAGE_URL = 'http://localhost:3000/models'; //https://predictant.herokuapp.com/models'

export const LoginButton = ({
  children,
  type,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  // loginWithRedirect = redirecting to Auth0's signup/login page. Signing up and logging in is done on same redirect
  const { loginWithRedirect } = useAuth0();

  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        // previously onClick={onClick}, which would route you to a different extension path, which was located in
        // App.js line 18. This is removed, as user does not need to go to our page, and then get redirected. User
        // should be directly redirected to Auth0
        onClick={() => loginWithRedirect(
            {
              redirectUri: MODEL_PAGE_URL 
            }
        )}
        type={type}
      >
        {children}
      </button>
  );
};

