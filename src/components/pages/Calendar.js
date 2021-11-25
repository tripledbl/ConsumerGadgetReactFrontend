import React from 'react';
import '../../App.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Calendar() {
  return <h1 className='Calendar'>Calendar</h1>;
}

function CalendarPage(){
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange = {onChange}
                value = {value}
                tileContent= {({date, view}) => ('x')}
                />
        </div>
    );
}