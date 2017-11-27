import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
const store = require('../store');
const apiOrigin = require('../config');

class SignOut extends Component {

  componentDidMount () {
    if (store.user) {
      $.ajax({
        url: apiOrigin() + '/sign-out/' + store.user.id,
        method: 'DELETE',
        headers: {
          Authorization: 'Token token=' + store.user.token
        },
        success: (response) => {
          store.user = null;
          $('#sign-in-link').removeClass('hidden');
          $('#sign-out-link, #change-pwd-link').addClass('hidden');
        }
      });
    }
  }

  render() {
    return (
      <div>
        Signed out Successfully!!
      </div>
    );
  }
}

export default withRouter(SignOut);
