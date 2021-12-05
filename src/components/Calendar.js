import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const orders_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IjlWdlh3ZnBOZDlTRWkyZ1l0OEVCRXhqY1k3blJWYmxaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL29yZGVycyIsImlhdCI6MTYzODY2NTMxMiwiZXhwIjoxNjM4NzUxNzEyLCJhenAiOiI5VnZYd2ZwTmQ5U0VpMmdZdDhFQkV4amNZN25SVmJsWiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.kjETxJwxeP81jKIfjyXkMoVFEaMzf8tjSX48Z4hBh18kELRnhKabYCzdANGGeKzSDbrTzNjw9umfSLgIrs4Ss6ZVNzUZsCnNaMVcVDIxX-cHqvVgu_ODktB3Fa01lm5GY7V99x0G8H6pFk_QqhsBcFq1zns34Rf2cYFyizC2JPFe_ZGcBJJJyhgzKUrwlvlH_VjIBgM48M5hSQqPXcs11q-Xds20WR2wFDErzRjJP4E7pD-DAlLeJQYuWFnNH4wYHArW5QX1Z1VnO4XnHCqw_sWCdOA-Y7PeKmWtcEx20wMG6Eqm24LfIwuY1FBPB428pWynxGDjWG9EMjsDSd_hhg'
const users_token = ''
const crabtreeId = process.env.REACT_APP_CRABTREE_USER_ID
const TWO_WEEKS = 14

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pastOrders: [] }
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
        today = this.formatDate(today);
        // this.getPredictions(today);
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
    getPredictions(today) {
        let counts = [];
        for (let i = 0; i < TWO_WEEKS; i++) {
            axios({
                method: 'GET',
                url: baseURL + '/user/' + crabtreeId + "/prediction",
                headers: {'Authorization': 'Bearer ' + users_token },
                date: today
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
                events={this.state.pastOrders}
            />
        )
    }
}