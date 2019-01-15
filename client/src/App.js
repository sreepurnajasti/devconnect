import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

//After browser refresh also persisting the user data
import jwtdecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

class App extends Component {
  render() {
    const token = localStorage.jwtToken;
    if (token) {
      //setting axios header
      setAuthToken(token);
      //decode token
      const decoded = jwtdecode(token);
      //saving to store by giving actions object [already reducer exists]
      store.dispatch(setCurrentUser(decoded));
      //check for expired token
      const currentTime = Date.now() / 100;
      if (decoded.exp < currentTime) {
        store.dispatch(clearCurrentProfile());
        //logout user
        store.dispatch(logoutUser());
        //redirect to login
        window.location.href = "/login";
      }
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
