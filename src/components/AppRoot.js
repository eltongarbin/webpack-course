import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './nav.css';

import Routes from './Routes';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default Counter;
