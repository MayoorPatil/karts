import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery';
const store = require('../store');
const apiOrigin = require('../config');

class ChangePassword extends Component {
  constructor(props) {
    super();
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      old: '',
      new: '',
      message: '',
      user: ''
    }
  }

passwordChange (e) {
    this.setState({
      old: e.target.value
    })
  }

passwordConfirmationChange (e) {
    this.setState({
      new: e.target.value
    })
  }

onChangePassword(e) {
  e.preventDefault();
  let data = {};
  data['passwords'] = {};
  data.passwords['old'] = this.state.old;
  data.passwords['new'] = this.state.new;
  $.ajax({
  url: apiOrigin() + '/change-password/' + store.user.id,
  method: 'PATCH',
  headers: {
      Authorization: 'Token token=' + store.user.token
    },
  data: data,
  success: (response) => {
    $('#status-message').html('Changed Passoword Success!!');
    var props = this.props.history
    setTimeout(function() {props.push('/karts');},1000)
  },
  error: (response, error) => {
    this.state.old = ''
    this.state.new = ''
    this.setState({
      message: 'Password change failed! Please try again ' + response.responseText
    })
    console.error(response)
  }
})
}

  render() {
    const { old } = this.state;
    const isEnabled =
      old.length > 0 &&
      this.state.new.length > 0;
      if (store.user) {
        return (
          <div className="container">
          <div id="status-message" className="container"></div>
            <form>
              <div className="form-group row">
                <div className="col-xs-4">
                  <label>Old Password</label>
                  <input
                  className="form-control"
                  ref="old"
                  type="password"
                  placeholder="Old password here"
                  value={this.state.old}
                  onChange={(e) => this.passwordChange(e)}
                  />
                </div><br /><br /><br /><br />
                <div className="col-xs-4">
                  <label>New Password</label>
                  <input
                  className="form-control"
                  ref="new"
                  type="password"
                  placeholder="Password conformation here"
                  value={this.state.new}
                  onChange={(e) => this.passwordConfirmationChange(e)}
                  />
                </div><br /><br /><br /><br />
              </div>
            </form>
            <button disabled={!isEnabled} className="btn btn-success" onClick={(e) => this.onChangePassword(e)}>Change Password</button>
            <br /><br /><p>{this.state.message}</p>
          </div>
        );
      } else {
        return (
          <div className="container">
          <h5>You need to sign-in to access this page</h5>
          Please <a href="/karts/sign-in">sign-in here</a>
          </div>);
      }
  }
}

export default ChangePassword;
