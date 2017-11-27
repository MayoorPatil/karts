import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    var wrapperClass = 'form-group row';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + "has-error";
    }
    return (
      <div className={wrapperClass}>
        <div className="field col-xs-4">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
        name={this.props.name}
        className="form-control"
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e)}
        />
        <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}

export default TextInput;
