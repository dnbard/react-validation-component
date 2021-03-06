![react validation component logo](https://raw.githubusercontent.com/dnbard/react-validation-component/master/public/logo.png)  

[![Build Status](https://travis-ci.org/dnbard/react-validation-component.svg?branch=master)](https://travis-ci.org/dnbard/react-validation-component)
[![codecov](https://codecov.io/gh/dnbard/react-validation-component/branch/master/graph/badge.svg)](https://codecov.io/gh/dnbard/react-validation-component)

**React Validation Component** is an utility component that solves data validation problem with the help of "native" React tool - `prop-types`.

Note: This **library is in development** and `API are going to be changed in the future`!

# Basic Example

Just show me the code!

```js
import React, { Component } from 'react';
import ReactValidation from 'react-validation-component';
import PropTypes from 'prop-types';

class MyComponent extends Component{
  constructor(){
    super();

    this.state = { username: '', age: 0 };

    this.myForm = {
      username: PropTypes.string.isRequired
      age: PropTypes.number.isRequired
    };
  }

  onFormValidation(errors){
    // this method are going to be called on every validation
  }

  render(){
    const { username, age } = this.state;

    return <form>
      <ReactValidation propTypes={ this.myForm } onValidation={ this.onFormValidation.bind(this) }>{ this.state }</ReactValidation>

      <input name="username" value={ username } onChange={ e => this.setState({ username: e.target.value }) } />
      <input name="age" value={ age } onChange={ e => this.setState({ age: e.target.value }) } />
    </form>
  }
}
```