import React, { Component } from 'react';
import './App.css';

class Home extends Component {

  render() {
    return (
      <div className="container font">
        <div className="jumbotron">
          <h2>Welcome to Kylee's Jewelery Collection</h2>
          <p>Start shopping for jewelry and use the cart icon/button to place your order</p>
          <p>Before you place your order please sign-in so that we can keep track of your orders</p>
          <p>Happy Shopping!!</p>
        </div>
      </div>
    );
  }
}

export default Home;
