import React, { Component } from 'react'

import './Main.scss'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      loaded: false,
      searchType: 'people',
      placeholder: "e.g. Chewbacca, Yoda, Boba Fett",
      result: null,

    }
  }

  async fetchData (searchInput, type) {
    if (this.state.input.length > 0) {
      

      try {
        const getData = await fetch(`https://swapi.co/api/${type}/?search=${searchInput}`)
        const result = await getData.json()
        this.setState({
          result: result.results,
          loaded: true
        })
        console.log(result)
        return result
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleRadio = ( type ) => {
    this.setState({searchType: type})
    type === "people" ? this.setState({placeholder: "e.g. Chewbacca, Yoda, Boba Fett"})
      : this.setState({placeholder: "e.g. A New Hope, Phantom Menace"})
  }

  handleInput = (e) => {
    this.setState({input: e.target.value})
    // this.state.input.length === 0 ? this.setState({loaded: false}) : null
    console.log(this.state.input)
  }



  render() {
    const { input, searchType, placeholder, loaded, result} = this.state
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
                  // value={ true }
                  defaultChecked
                  onClick={ () => this.handleRadio("people") }
                />
                <label htmlFor="People" className="People">People</label>
                <input type="radio"
                  name="type"
                  className="Ellipse"
                  onClick={ () => this.handleRadio("films") } 
                />
                <label htmlFor="Movies" className="Movies">Movies</label>
              </form>
              <input className="search-input"
                type="search" 
                value={ input } 
                onChange={ this.handleInput }         
                placeholder={ placeholder }
              />

              <button className="SearchButton"
                style={
                  input.length > 0 ?
                    { cursor: "pointer", background: "#0ab463"} :
                    null
                }
                onClick= { () => this.fetchData(input, searchType)}
              >
              SEARCH
                {/* { 
                  input.length === 0 ?
                    "SEARCH" :
                    "SEARCHING..."
                } */}
              </button>
      

            </div>
          </div>

          <div className="results-div">
            <div className="Results">
             Results
            
            </div>
            {/* <div className="There-are-zero-matches-Use-the-form-to-search-for"> */}
            { loaded && result.length > 0 &&
              <ul className="results-list">
                {result.map(item => {
                  return (
                    <li className="result-item" key={item.created}>
                      { searchType === "people" ? item.name
                        : item.title
                      }
                      <button className="detail-button">
                      DETAILS
                      </button>
                    </li>
                  )
                })}
              </ul>
              || 
              <div className="There-are-zero-matches-Use-the-form-to-search-for">
              FEEDBACK
              </div>
            }
            {/* </div> */}
          </div>
        </div>
       

      </div>
    )
  }
}

export default Main;