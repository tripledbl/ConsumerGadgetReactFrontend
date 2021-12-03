
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Models from './components/pages/Models';
import Products from './components/pages/Products';
import About from './components/pages/About';
//import React, {useState, useEffect} from 'react';
import React from 'react';
//import axios from "axios";

function App() {
    //const [initData, setInitData] = useState([{}])
    //const baseURL = "http://127.0.0.1:5000";

    /*useEffect(()=> {
        fetch('http://127.0.0.1:5000').then(
            response => response.json()
        ).then(data => console.log(data))
    });*/

    /*React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            console.log(response.data);
        });
    }, []);*/

    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/models' component={Models} />
          <Route path='/products' component={Products} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
  );
}

export default App;
