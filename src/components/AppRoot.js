import React, { Component } from 'react';
import MarkdownData from '../../data/post.md';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile">
        <img src={require('../images/link.jpg')} />
        <h1>{MarkdownData.title}</h1>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}
        />
      </div>
    );
  }
}

export default Counter;
