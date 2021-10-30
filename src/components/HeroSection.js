import React from 'react';
import '../App.css';
import  { LoginButton } from './LoginButton';
import './HeroSection.css';
import {useAuth0} from "@auth0/auth0-react";

function HeroSection() {
    const {isLoading, user} = useAuth0();

  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>Predictant</h1>
      <p>Predictive Modeling Made Accessible</p>
      <div className='hero-btns'>
          { !isLoading && !user && (
              // If the user is not logged in, then by clicking "GET STARTED" it will redirect them to the login page
              <LoginButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </LoginButton>
          )}
          { !isLoading && user && (
              // empty body so the "GET STARTED" text doesn't show
              <body>

              </body>
          )}
      </div>
    </div>
  );
}

export default HeroSection;
