import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Models from './components/pages/Models';
import Products from './components/pages/Products';
import About from './components/pages/About';
//import Calendar from './components/pages/Forecast';
import Forecast from './components/pages/Forecast';

function App() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/models' component={Models} />
          <Route path='/calendar' component={Forecast} />
          <Route path='/products' component={Products} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
  );
}

export default App;
