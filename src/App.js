import './App.css';
import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import { Redirect } from 'react-router';

import index from './pages/home/index';
import { PATH_NULL, PATH_ADMIN, PATH_HOME, PATH_LOGIN } from './routers/router'
import AdminPage from './pages/admin/admin-page';
import FormLogin from './pages/login/components/login/form-login';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={PATH_ADMIN} render={() => { return (localStorage.getItem("accessToken") ? <AdminPage /> : <Redirect to={PATH_LOGIN} />) }} />
        <Route path={PATH_LOGIN} component={FormLogin} />
        <Route path={PATH_NULL} component={index} />
        <Route path={PATH_HOME} component={index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
