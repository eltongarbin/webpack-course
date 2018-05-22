import React from 'react';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import '../css/About.css';

const Article = (props) => {
  require(`../css/${props.site}/theme.css`);
  const siteConfig = require(`../../data/${props.site}/siteConfig.js`);

  try {
    // const MarkdownData = require(`../../data/${props.site}/${
    //   props.match.params.slug
    // }.md`);
    // const posterStyle = {
    //   backgroundImage: `url(${MarkdownData.posterImage})`
    // };

    return (
      <div>
        <div className="Article">
          <h1>{props.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: props.__content }}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default connect((state) => ({
  title: state.text,
  __content: state.text
}))(Article);
