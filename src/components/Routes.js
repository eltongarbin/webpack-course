import React from 'react';
import { Route, Link } from 'react-router-dom';
import universal from 'react-universal-component';
import { Switch } from 'react-router';

import NotFound from './NotFound';
import '../css/nav.css';

const UniversalComponent = universal((props) => import(`./${props.page}`));

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article/post">Article 1</Link>
      <Link to="/article/post2">Article 2</Link>
      <Link to="/draft/post">Draft 1</Link>
      <Link to="/draft/post2">Draft 2</Link>
    </div>
    <Switch>
      <Route exact path="/">
        <UniversalComponent page="Gallery" />
      </Route>

      <Route
        path="/about"
        render={({ staticContext }) => {
          const site = staticContext
            ? staticContext.site
            : location.hostname.split('.')[0];

          return <UniversalComponent page="About" site={site} />;
        }}
      />

      <Route
        path="/article/:slug"
        render={({ staticContext, match }) => {
          const site = staticContext
            ? staticContext.site
            : location.hostname.split('.')[0];

          return (
            <UniversalComponent page="Article" match={match} site={site} />
          );
        }}
      />

      <Route
        path="/draft/:slug"
        render={({ staticContext, match }) => {
          const site = staticContext
            ? staticContext.site
            : location.hostname.split('.')[0];

          return (
            <UniversalComponent page="DraftArticle" match={match} site={site} />
          );
        }}
      />

      <Route component={NotFound} />
    </Switch>
  </div>
);
