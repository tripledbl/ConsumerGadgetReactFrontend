import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const orders_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IjlWdlh3ZnBOZDlTRWkyZ1l0OEVCRXhqY1k3blJWYmxaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL29yZGVycyIsImlhdCI6MTYzODcwNDU2MywiZXhwIjoxNjM4NzkwOTYzLCJhenAiOiI5VnZYd2ZwTmQ5U0VpMmdZdDhFQkV4amNZN25SVmJsWiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.kgROjQUXGxx-xdz2yiPT2eCj3XnnF2CgBjDdUsk33MrWiD5xhpwPM2Jx3A66REwuxTyfBZY1BazSX7CwdV7_NjK2DpykWnqKQ7EfbhyMZ771GnPGrFOItZc9AzvoSO7WRWm-KPNVU41-mm34gdcD_5HzJrlNrkKo35bHJqiF_lS36LwLfsu4xtB4OEIdy-PigkX4sd1HKtJsQOFJCIk8Y1kOpCLb-3zqnbHTXoCMxui02YyNlce7TthXxFnSDbPuiAV9amSw7VGWhSPHrAuq9llGdOmsAvOSQ-zNPkdG9HGz0NfbPgquO9Z--a4I3khAPyBP6x0Y7181Siin4oCt1Q'
const users_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IkpTTXROa2UyM1ZaMHYwTDR1RlFuTnVXODdlOFNLSUVnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL3VzZXIiLCJpYXQiOjE2Mzg3MDQ1MTcsImV4cCI6MTYzODc5MDkxNywiYXpwIjoiSlNNdE5rZTIzVlowdjBMNHVGUW5OdVc4N2U4U0tJRWciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XNoAGocaRzeoxYfCW2t88fzGi9ZSrmN9scJ1szVMAfEF4Q-arZcbDV-ZANyvq6uYSrKUw82cV3unBdlFoZKM0B8TrRY5ehg6BIqXNUiUNnD22o9KCTdaJOJSVvrWAdrMGgeoLW5EF82lf8Q8ufZ9yykWWh3VJbD8mb19IgDX6wj60p1WgM3Fvz3-isVOERdNH_3irJ5zTFZu6FquUpy2ctEXDBR4HtCpWYE4CjjH-Ixc5XgEphmdUR6MQNufNK3MF5ARiri-Wr6jypgUcVjuGNf2inVXNjZRaTlspNxp3fcJuyAoUd6--YFwxGz2W446ksgKZBrLARiE_DGuFXJmlw'
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