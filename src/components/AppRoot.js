import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile">
        <img src={require('../images/link.jpg')} />
        <h1>{this.props.heading}</h1>
        <div className="content">{this.props.bioText}</div>
      </div>
    );
  }
}

export default Counter;
