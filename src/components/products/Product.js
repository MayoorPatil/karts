import React, { Component } from 'react';

class Product extends Component {

  render() {
    var styles = {
      height: '280px',
      width: '100%',
      display: 'block'
    };
      return (

            <div className="col-md-3">
              <div className="thumbnail">
                  <img className="img-responsive" src={this.props.image_url} alt="Earings" style={styles}/>
                  <div className="caption">
                  <p><strong>{this.props.description}</strong></p>
                    <p>Price: {this.props.price}</p>
                  </div>
                  <button className="btn btn-success btn-xs" onClick={(e) => this.props.updateClick(e, this.props)}>Update</button>
                  &nbsp; &nbsp; &nbsp;<button className="btn btn-danger btn-xs" onClick={(e) => this.props.deleteClick(e, this.props)}>Delete</button>
              </div>
            </div>

      );
  }
}

export default Product;
