import React, { Component } from 'react'

import './Main.scss'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      feedback: false,
      searchType: 'people',
      placeholder: "e.g. Chewbacca, Yoda, Boba Fett"

    }
  }

  handleRadio = (e) => {
    this.setState({searchType: e.target.value})
    console.log(this.state.searchType)
  }

  handleInput = (e) => {
    this.setState({input: e.target.value})
    console.log(this.state.input)
  }

  render() {
    console.log(this.props)
    return (
      <div className="Main">
        <div className="content-wrapper">
          <div className="search-div">
            <div className="search-content-wrapper">
              <p className="search-title">
                What are you searching for?
              </p>
              <form className="radio-group">
                <input type="radio"
                  name="type"
                  className="Ellipse"
                  value="people" 
                  onClick={ this.handleRadio }
                />
                <label htmlFor="People">People</label>
                <input type="radio"
                  name="type"
                  className="Ellipse"
                  value="movies"
                  onClick={ this.handleRadio } 
                />
                <label htmlFor="Movies">Movies</label>
              </form>
              <input className="search-input"
                type="search" 
                value={ this.state.input } 
                onChange={ this.handleInput }         
                placeholder={ this.state.placeholder }
              />
      

            </div>
          </div>

          <div className="results-div">
        
          </div>
        </div>
       

      </div>
    )
  }
}

export default Main;