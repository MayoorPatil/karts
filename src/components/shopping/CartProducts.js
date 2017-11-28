import React, { Component } from 'react';

class CartProducts extends Component {

  render() {
    var styles = {
      height: '300px',
      width: '100%',
      display: 'block'
    };
      return (
          <div className="row" ref={this.props.id}>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                  <img src={this.props.image_url} alt="Earings" style={styles}/>
                  <div className="caption">
                  <h3>{this.props.description}</h3>
                    <p>Price: {this.props.price}</p>
                  </div>
                  <button id={this.props.id} className="btn btn-success" onClick={(e) => this.props.updateCart(e, this.props)}>Add To Cart</button>
              </div>
            </div>
          </div>
      );
  }
}

export default CartProducts;
