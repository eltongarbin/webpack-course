import React from 'react';

import NotFound from './NotFound';
import '../css/About.css';

export default (props) => {
  require(`../css/${props.site}/theme.css`);

  const siteConfig = require(`../../data/${props.site}/siteConfig.js`);
  const imagePath = require(`../images/${siteConfig.aboutImage}`);

  try {
    const MarkdownData = require(`../../data/${props.site}/${
      props.match.params.slug
    }.md`);
    const posterStyle = {
      backgroundImage: `url(${MarkdownData.posterImage})`
    };

    return (
      <div>
        <div className="Article">
          <div className="poster" style={posterStyle} />
          <h1>{MarkdownData.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};
