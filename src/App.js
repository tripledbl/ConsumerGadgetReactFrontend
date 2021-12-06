import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Models from './components/pages/Models';
import Products from './components/pages/Products';
import Forecast from './components/pages/Forecast'

function App() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/models' component={Models} />
          <Route path='/products' component={Products} />
          <Route path='/forecast' component={Forecast} />
        </Switch>
      </Router>
  );
}

export default App;
