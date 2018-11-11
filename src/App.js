import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./views/Main";
import Details from './views/Details'
import Header from './views/Header'
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch {...this.props}>
            <Route exact path="/"  render={(props) => <Main {...props} />} />
            <Route exact path="/:type/:id"  render={(props) => <Details {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
