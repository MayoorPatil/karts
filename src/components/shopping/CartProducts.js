import React, { Component } from 'react';

class CartProducts extends Component {

  render() {
    var styles = {
      height: '280px',
      width: '100%',
      display: 'block'
    };
      return (

            <div className="col-md-3">
              <div className="thumbnail">
                  <img src={this.props.image_url} alt="Earings" style={styles}/>
                  <div className="caption">
                  <p><strong>{this.props.description}</strong></p>
                    <p>Price: {this.props.price}</p>
                  </div>
                  <button id={this.props.id} className="btn btn-success btn-sm" onClick={(e) => this.props.updateCart(e, this.props)}>Add To Cart</button>
              </div>

          </div>
      );
  }
}

export default CartProducts;
