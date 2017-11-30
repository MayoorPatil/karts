import React, { Component } from 'react';

class Contact extends Component {

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Contact Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kylee Schadler - For Unique Handmade Jewelry</td>
            </tr>
            <tr>
              <td>kschadler@gmail.com</td>
            </tr>
            <tr>
              <td>508-454-4767</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contact;
