import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const orders_token = process.env.REACT_APP_ORDERS_API_TOKEN
const users_token = process.env.REACT_APP_USERS_API_TOKEN
const crabtreeId = process.env.REACT_APP_CRABTREE_USER_ID

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            pastOrders: [],
            predictionOrders: []
        }
    }

    componentDidMount() {
        this.calendar()
    }

    calendar() {
        // get historical order data
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday = this.formatDate(yesterday);
        this.getOrders(yesterday);

        // get prediction order data
        let today = new Date();
        this.getPredictions(today);
    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // gives 14 days worth of customer volume predictions starting with today
    // day: a date object
    getPredictions(day) {
        let fromDate = new Date();
        let toDate = new Date();
        toDate.setDate(toDate.getDate() + 20);
        fromDate = this.formatDate(fromDate);
        toDate = this.formatDate(toDate);
        axios({
            method: 'GET',
            url: baseURL + '/user/' + crabtreeId + '/prediction/' + fromDate + '/' + toDate,
            headers: {'Authorization': 'Bearer ' + users_token },
        }).then(res => {
            let predictionOrders = [];
            for (const date in res.data) {
                let dateObj = new Date(date);
                if (dateObj.getDay() === 0 || dateObj.getDay() === 1) {
                    continue;
                }
                let obj = {
                    title: 'prediction: ' + Math.round(res.data[date]),
                    date: date,
                    color: "rgb(103, 58, 183)"
                }
                predictionOrders.push(obj);
            }
            this.setState({ predictionOrders: predictionOrders });
        })
        day.setDate(day.getDate() + 1)
    }

    getOrders(today) {
        axios({
            method: 'GET',
            url: baseURL + '/orders/2021-6-1/' + today,
            headers: {
                'Authorization': 'Bearer ' + orders_token
            }
        }).then(dates => {
            let counts = [];
            for (const date in dates.data) {
                let obj = {
                    'title': 'Order Count: ' + dates.data[date],
                    'date': date
                }
                counts.push(obj)
            }
            this.setState({ pastOrders: counts });
        });
    }

    render() {
        return(
            <FullCalendar  
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin ]}
                events={this.state.pastOrders.concat(this.state.predictionOrders)}
            />
        )
    }
}