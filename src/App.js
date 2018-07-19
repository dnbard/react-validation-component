import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import ReactValidation from './validation.jsx';

const myPropTypes = { name: PropTypes.number.isRequired };
const obj = { name: 'Alex' };

export default class App extends Component {
  constructor(){
    super();
    
    this.state = { error: null };
  }

  onValidation(e){
    this.setState({ errors: e });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Validation Component</h1>
        </header>
        <p className="App-intro">
          <ReactValidation propTypes={ myPropTypes } onValidation={ this.onValidation.bind(this) }>
            { obj }
          </ReactValidation>

          { this.state.errors ? this.state.errors.map(e => e.error.message) : null }
        </p>
      </div>
    );
  }
}
