import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery';
import TextInput from './TextInput.js';
const store = require('../store');
const apiOrigin = require('../config');

class SignUp extends Component {
  constructor(props) {
    super();
    this.onSignUp = this.onSignUp.bind(this);
    this.setSignUpState = this.setSignUpState.bind(this);
    this.state = {
      credentials: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      message: '',
      errors: {},
    }
  }

  setSignUpState (e) {
    var field = e.target.name;
    var value = e.target.value;
    var credentials = this.state.credentials;
    credentials[field] = value
      this.setState({
        credentials: credentials
      })
    }

  signInFormIsValid () {
    var formIsValid = true;
    this.state.errors = {} // clear any previous errors
    if (this.state.credentials.email.length < 3) {
      this.state.errors.email = 'Email must be at least 3 characters';
      formIsValid = false;
    }
    if (this.state.credentials.password.length < 3) {
      this.state.errors.password = 'Password must be at least 3 characters';
      formIsValid = false;
    }
    if (this.state.credentials.password_confirmation.length < 3) {
      this.state.errors.password_confirmation = 'Password Confirmation must be at least 3 characters';
      formIsValid = false;
    }
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  onSignUp(e) {
    e.preventDefault();
    if (!this.signInFormIsValid()) {
      return;
    }
    let data = {};
    data['credentials'] = this.state.credentials
    $.ajax({
    url: apiOrigin() + '/sign-up',
    method: 'POST',
    data: data,
    success: (response) => {
      this.setState({user: response.user});
      store.user = response.user
      $('#status-message').html('Sign-Up Success!!');
      var props = this.props.history
      setTimeout(function() {props.push('/karts/sign-in');},1000)
      $('#sign-up-toggle-text, #sign-up-toggle').addClass('hidden');
    },
    error: (response, error) => {
      this.state.credentials.email = ''
      this.state.credentials.password = ''
      this.state.credentials.password_confirmation = ''
      this.setState({
        message: 'Sign up failed! Please try again ' + response.responseText
      })
      console.error(response)
    }
  })
}

  render() {
    const { email, password, password_confirmation } = this.state.credentials;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      password_confirmation.length > 0;
    return (
      <div className="container">
      <div className="container">
      <div id="status-message" className="container"></div>
        <h3>Sign Up</h3>
        <form>
          <TextInput
          type="text"
          name="email"
          label="Email"
          value={this.state.credentials.email}
          onChange={this.setSignUpState}
          error={this.state.errors.email}/>

          <TextInput
          type="password"
          name="password"
          label="Password"
          value={this.state.credentials.password}
          onChange={this.setSignUpState}
          error={this.state.errors.password}/>

          <TextInput
          type="password"
          name="password_confirmation"
          label="Password Confirmation"
          value={this.state.credentials.password_confirmation}
          onChange={this.setSignUpState}
          error={this.state.errors.password_confirmation}/>

          <button disabled={!isEnabled} className="btn btn-success" onClick={(e) => this.onSignUp(e)}>Sign In</button>
        </form>
      </div>
        <br /><br /><p>{this.state.message}</p>
    </div>
    );
  }
}

export default SignUp;
