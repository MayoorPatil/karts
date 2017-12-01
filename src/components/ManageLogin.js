import React, { Component } from 'react';
import SignIn from './SignIn.js';
import $ from 'jquery';
const store = require('../store');
const apiOrigin = require('../config');

class ManageLogin extends Component {
  constructor(props) {
    super(props);
    this.setLoginState = this.setLoginState.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.navToSignUp = this.navToSignUp.bind(this);
    this.state = {
      credentials: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      message: '',
      errors: {},
      user: {},
      isLoggedIn: false
    }
  }

  setLoginState (e) {
    var field = e.target.name;
    var value = e.target.value;
    var credentials = this.state.credentials
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
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

    onSignIn(e) {
      e.preventDefault();
      if (!this.signInFormIsValid()) {
        return;
      }
      let data = {};
      data['credentials'] = this.state.credentials
      $.ajax({
      url: apiOrigin() + '/sign-in',
      method: 'POST',
      data: data,
      success: (response) => {
        this.setState({user: response.user});
        store.user = response.user
        if (store.proceedToCheckout) {
          store.proceedToCheckout = false
          this.props.history.push('/karts/order-view');
        } else {
            $('#status-message').html('Login Success!!');
            var props = this.props.history
            setTimeout(function() {props.push('/karts');},1000)
        }
        response.user.id === 1 ? $('#manage-products').removeClass('hidden') : $('#manage-products').addClass('hidden')
        $('#sign-in-link').addClass('hidden');
        $('#sign-out-link, #change-pwd-link, #order-history').removeClass('hidden');
      },
      error: (error) => {
        this.state.credentials.email = ''
        this.state.credentials.password = ''
        this.setState({
          message: 'Sign in failed! Credentials do not match. Please try again'
        })
        console.error(error)
      }
    })
  }

  navToSignUp (e) {
    this.props.history.push('/karts/sign-up')
  }

  render() {
    return (
      <div>
        <div id="status-message" className="container"></div>
        <SignIn
        credentials={this.state.credentials}
        onChange={this.setLoginState}
        onSignIn={this.onSignIn}
        navToSignUp={this.navToSignUp}
        errors={this.state.errors}
        message={this.state.message}/>
      </div>
    );
  }
}

export default ManageLogin;
