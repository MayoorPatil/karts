import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item.js';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class ManageShopping extends Component {
  constructor(props) {
    super(props);
    this.updateClick = this.updateClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    $.ajax({
      url: apiOrigin() + '/products',
      method: 'GET',
      success: (data) => {
        this.setState({
          products: data.products
        })
        store.products = data.products
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

updateClick(e, props) {
  console.log('props are...', props)
  store.itemIdToUpdate = props.id
  this.props.history.push('/karts/shopping/update-item')
}

deleteClick(e, props) {
  $.ajax({
    url: apiOrigin() + '/products/' + props.id,
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + store.user.token
    },
    success: (data) => {
      var updatedProducts = this.state.products
      updatedProducts.splice(updatedProducts.findIndex((ele) => ele.id === props.id),1)
      this.setState({
        products: updatedProducts
      })
      this.props.history.push('/karts/shopping')
    },
    error: (error) => {
      console.error(error)
    }
  });
}

    render() {
            if (!this.state.products) {
              return (<div>Loading...</div>);
            } else {
              var components = this.state.products.map((item, index) => {
                return <Item
                id={item.id}
                key={index}
                image_url={item.image_url}
                price={item.price}
                description={item.description}
                updateClick={this.updateClick}
                deleteClick={this.deleteClick}
                />
              })
            return (
            <div id="test" className="container">
              <button className="btn btn-success" onClick={(e) => this.addProduct(e)}>Add New Product</button><br /><br />
              {components}
            </div>
          );
        }
      }
}

export default ManageShopping;
