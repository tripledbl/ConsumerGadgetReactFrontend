import React from 'react';
import { Link } from 'react-router-dom';
import './ForecastCard.css'

function ForecastCard(props) {
  return (
    <Link className='cards__item__link' to={props.path}>
        <div className='forecast__name'>{props.name}</div>
        <div className='details'>
            <div className='detail'>Accuracy: {props.accuracy}</div>
            <div className='detail'>Average Error: {props.error}</div>
        </div>
    </Link>
  );
}

export default ForecastCard;