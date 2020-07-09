import React from 'react';
import Page404 from './views/Page404/page404';
import { isAuthenticated } from './providers/auth';
import MapPage from './views/Home/home.jsx';
import LoginPage from './views/Login/login.jsx';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login" }}
            />
          )
      }
      }
    />
  );
}

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/map" component={MapPage} />
        <PrivateRoute path="/" component={<Redirect to={{ pathname: "/map" }} />} />
        <Route path='*' component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
