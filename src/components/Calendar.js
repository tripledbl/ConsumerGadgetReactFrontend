import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const orders_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IjlWdlh3ZnBOZDlTRWkyZ1l0OEVCRXhqY1k3blJWYmxaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL29yZGVycyIsImlhdCI6MTYzODY2NTMxMiwiZXhwIjoxNjM4NzUxNzEyLCJhenAiOiI5VnZYd2ZwTmQ5U0VpMmdZdDhFQkV4amNZN25SVmJsWiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.kjETxJwxeP81jKIfjyXkMoVFEaMzf8tjSX48Z4hBh18kELRnhKabYCzdANGGeKzSDbrTzNjw9umfSLgIrs4Ss6ZVNzUZsCnNaMVcVDIxX-cHqvVgu_ODktB3Fa01lm5GY7V99x0G8H6pFk_QqhsBcFq1zns34Rf2cYFyizC2JPFe_ZGcBJJJyhgzKUrwlvlH_VjIBgM48M5hSQqPXcs11q-Xds20WR2wFDErzRjJP4E7pD-DAlLeJQYuWFnNH4wYHArW5QX1Z1VnO4XnHCqw_sWCdOA-Y7PeKmWtcEx20wMG6Eqm24LfIwuY1FBPB428pWynxGDjWG9EMjsDSd_hhg'
const users_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IkpTTXROa2UyM1ZaMHYwTDR1RlFuTnVXODdlOFNLSUVnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL3VzZXIiLCJpYXQiOjE2Mzg2OTQyNjUsImV4cCI6MTYzODc4MDY2NSwiYXpwIjoiSlNNdE5rZTIzVlowdjBMNHVGUW5OdVc4N2U4U0tJRWciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.R9OeO9Dv6zSq2UDX1zSS6gVstEDlJ0o6_R_bRV22C0Eo0kc7WUFguDSOr03v9IcK3sWS-Ud3hHt9vjSwZKys60xJeAWB-Sq4jFuLukd6kvEHCG4CZMZ3UZMbF8bS-vqgePCXiZSn4c9rM9EZwblpGSTzH403Q6Tc50zS8p2vy-dOlkWhg9bXWabDdmtUp_gfSnc0oXJiFwg5AFDtk9q19_nKqffDx98yG4aM2Z43tIKUZNREMTBkQ326TiYrWNTQukNWpNXZ1-JGvfEBaNi_20pav0LL-gT-tkQS7-qTGTdbcaWE4ZFiE19PQ7KsjunwJPgXPYZJ7XLEDJSOzkHvhA'
const crabtreeId = process.env.REACT_APP_CRABTREE_USER_ID
const TWO_WEEKS = 14

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
        toDate.setDate(toDate.getDate() + 13);
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