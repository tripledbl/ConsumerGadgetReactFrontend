import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const baseURL = process.env.REACT_APP_BASE_URL

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pastOrders: [] }
    }

    componentDidMount() {
        this.Calendar()
    }

    Calendar() {
        console.log('MAKING API CALL: ' + baseURL);
    }

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