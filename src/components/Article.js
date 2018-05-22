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
    require(`../css/${this.props.site}/theme.css`);
    const siteConfig = require(`../../data/${this.props.site}/siteConfig.js`);

    try {
      // const MarkdownData = require(`../../data/${this.props.site}/${
      //   this.props.match.params.slug
      // }.md`);
      // const posterStyle = {
      //   backgroundImage: `url(${MarkdownData.posterImage})`
      // };

      return (
        <div>
          <div className="Article">
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
  __content: state.content
}))(Article);
