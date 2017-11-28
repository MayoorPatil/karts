import React, { Component } from 'react';

class Item extends Component {

  render() {
    var styles = {
      height: '200px',
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
                  <button className="btn btn-success" onClick={(e) => this.props.updateClick(e, this.props)}>Update</button>
                  &nbsp; &nbsp; &nbsp;<button className="btn btn-danger" onClick={(e) => this.props.deleteClick(e, this.props)}>Delete</button>
              </div>
            </div>
          </div>
      );
  }
}

export default Item;
