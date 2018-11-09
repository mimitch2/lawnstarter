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

  handleRadio = ( type ) => {
    this.setState({searchType: type})
    type === "people" ? this.setState({placeholder: "e.g. Chewbacca, Yoda, Boba Fett"})
      : this.setState({placeholder: "e.g. A New Hope, Phantom Menace"})
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
              <p className="What-are-you-searching-for">
                What are you searching for?
              </p>
              <form className="radio-group">
                <input type="radio"
                  name="type"
                  className="Ellipse"
                  value={ true }
                  defaultChecked
                  onClick={ () => this.handleRadio("people") }
                />
                <label htmlFor="People" className="People">People</label>
                <input type="radio"
                  name="type"
                  className="Ellipse"
                  // value={ this.state.searchType }
                  onClick={ () => this.handleRadio("films") } 
                />
                <label htmlFor="Movies" className="Movies">Movies</label>
              </form>
              <input className="search-input"
                type="search" 
                value={ this.state.input } 
                onChange={ this.handleInput }         
                placeholder={ this.state.placeholder }
              />

              <button className="SearchButton">
                { "SEARCH" }
              </button>
      

            </div>
          </div>

          <div className="results-div">
            <div className="Results">
             Results
            
            </div>
            <div className="There-are-zero-matches-Use-the-form-to-search-for">
              { "There are zero matches."} 
              { " Use the form to search for People of Movies"}
            </div>
          </div>
        </div>
       

      </div>
    )
  }
}

export default Main;