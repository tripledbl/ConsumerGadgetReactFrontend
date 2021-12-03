import React from 'react';
import '../../App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default class Calendar extends React.Component {

    render(){
        return(
            <FullCalendar  

            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin ]}
            events={[ {title: 'event 1', date: '2021-11-11'}]}
            /> 
        )
    }
}