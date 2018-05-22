import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/About.css';
import NotFound from './NotFound';
import { fetchArticle } from './../actions';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchArticle(this.props.site, this.props.match.params.slug)
    );
  }

  render() {
    try {
      import(`../css/${this.props.site}/theme.css`);
      const siteConfig = require(`../../data/${this.props.site}/siteConfig.js`);
      const billboardStyle = {
        backgroundImage: `url(${this.props.posterImage})`
      };

      return (
        <div>
          <div className="Article">
            <div className="billboard" style={billboardStyle} />
            <h1>{this.props.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: this.props.__content }}
            />
          </div>
        </div>
      );
    } catch (error) {
      return <NotFound />;
    }
  }
}

export default connect((state) => ({
  ...state.content
}))(Article);
