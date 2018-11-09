import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./views/Main";
import Details from './views/Details'

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
    }
  }

  componentDidMount () {
    // this.fetchData()
  }


  render() {
    return (
      <Router>
        <div className="App">
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


//. for serch feedback, conditionaly render divs based on serc