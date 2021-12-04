import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastCards.css';

function Cards() {
    return (
      <div className='cards'>
        <h1 className='title'>Forecasts</h1>
        <div className='cards__container'>
            <ForecastCard
                name='Order Volume'
                accuracy='82%'
                error='4.5'
                path='/forecast'>
            </ForecastCard>
            <ForecastCard
                name='Revenue'
                accuracy='79%'
                error='5.8'
                path='/forecast'>
            </ForecastCard>
        </div>
      </div>
    );
  }
  
  export default Cards;