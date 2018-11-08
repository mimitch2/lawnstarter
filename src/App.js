import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./views/Main";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      searchType: 'people',
      feedback: false
    }
  }

  componentDidMount () {
    // this.fetchData()
  }


  async fetchData (searchInput) {
    try {
      const getData = await fetch(`https://swapi.co/api/${this.state.searchType}/?search=${searchInput}`)
      const result = await getData.json()
    
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
    }
  }
  

  render() {
    return (
      <Router>
        <div className="App">
          <Switch {...this.props}>
            {/* <Route exact path="/" component={Main} /> */}
            <Route exact path="/"  render={(props) => <Main {...props} search={ this.fetchData } />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


//. for serch feedback, conditionaly render divs based on serc