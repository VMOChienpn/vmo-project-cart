import './App.css';
import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
//import { PersistGate } from 'redux-persist/integration/react'

import index from './pages/home/index';
import { PATH_NULL, PATH_ADMIN, PATH_HOME } from './routers/router'
import AdminPage from './pages/admin/admin-page';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={PATH_ADMIN} component={AdminPage} />
        <Route path={PATH_NULL} component={index} />
        <Route path={PATH_HOME} component={index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
