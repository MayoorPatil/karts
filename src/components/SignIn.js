import React, { Component } from 'react';
import TextInput from './TextInput.js'

class SignIn extends Component {
  render() {
    const { email, password } = this.props.credentials;
    const isEnabled =
      email.length > 0 &&
      password.length > 0;
    return (
      <div className="container">
        <h5 id="sign-up-toggle-text">If not a registered user, then please register</h5>
        <button id="sign-up-toggle" type="button" className="btn btn-success btn-sm" onClick={(e) => this.props.navToSignUp(e)}>Sign Up / Register</button>
        <h3>Sign In</h3>
        <form>
          <TextInput
          type="text"
          name="email"
          label="Email"
          value={this.props.credentials.email}
          onChange={this.props.onChange}
          error={this.props.errors.email}/>

          <TextInput
          type="password"
          name="password"
          label="Password"
          value={this.props.credentials.password}
          onChange={this.props.onChange}
          error={this.props.errors.password}/>

          <button disabled={!isEnabled} className="btn btn-success" onClick={(e) => this.props.onSignIn(e)}>Sign In</button>
          <br /><br /><p>{this.props.message}</p>
        </form>
      </div>
    );
  }
}

export default SignIn;
