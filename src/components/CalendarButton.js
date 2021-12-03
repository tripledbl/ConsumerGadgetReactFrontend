import React from 'react';
import './Button.css';
import Calendar from './pages/Calendar.js';
//import './Calendar.css';
//import 'react-calendar/dist/Calendar.css';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const CalendarButton = ({
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
  const { loginWithRedirect } = Calendar();
  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        // previously onClick={onClick}, which would route you to a different extension path, which was located in
        // App.js line 18. This is removed, as user does not need to go to our page, and then get redirected. User
        // should be directly redirected to Auth0
        onClick={() => loginWithRedirect(
            {
              redirectUri: 'https://predictant.herokuapp.com/calendar'
            }
        )}
        type={type}
      >
        {children}
      </button>
  );
};

