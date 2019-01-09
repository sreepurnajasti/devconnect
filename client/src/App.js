import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

//After browser refresh also persisting the user data
import jwtdecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
