import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MyMusicLibrary from './containers/MyMusicLibrary';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={MyMusicLibrary} />
  </Route>
);

export default AppRoutes;
