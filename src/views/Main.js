import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import './Main.scss'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      loaded: false,
      searchType: 'people',
      placeholder: "e.g. Chewbacca, Yoda, Boba Fett",
      result: [],
      searching: false,
      show: false
    }
  }

  componentDidMount = () => {
    this.setState({show: true})
  }

  async fetchData (searchInput, type) {
    if (this.state.input.length > 0) {
      this.setState({
        searching: true,
        result: []
      })
      try {
        const getData = await fetch(`https://swapi.co/api/${type}/?search=${searchInput}`)
        const result = await getData.json()
        this.setState({
          result: [...result.results],
          loaded: true,
          searching: false
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleRadio = ( type ) => {
    this.setState({searchType: type})
    this.setState({
      placeholder: type === "people" ? "e.g. Chewbacca, Yoda, Boba Fett" :
        "e.g. A New Hope, Phantom Menace",
      result: [],
      input: ''
    })
  }

  handleInput = (e) => {
    const input = e.target.value
    this.setState({input: input})
    if (input.length === 0) {
      this.setState({
        result: []
      })
    }
  }

  render() {
    const { input, searchType, placeholder, loaded, result, searching, show } = this.state
    return (
      <div className="Main">
        <CSSTransition
          in={show}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
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
                    defaultChecked
                    onClick={ () => this.handleRadio("people") }
                  />
                  <label htmlFor="People" className="People">
                 People
                  </label>
                  <input type="radio"
                    name="type"
                    className="Ellipse"
                    onClick={ () => this.handleRadio("films") } 
                  />
                  <label htmlFor="Movies" className="Movies">
                  Movies
                  </label>
                </form>

                <input className="search-input"
                  type="text" 
                  onChange={ this.handleInput }         
                  placeholder={ placeholder }
                  value= { input }
                  onKeyDown={ () => event.key === "Enter" ? 
                    this.fetchData(this.state.input, this.state.searchType) : null } 
                />
                <button className="SearchButton"
                  onClick= { () => this.fetchData(input, searchType) }
                  style={
                    input.length > 0 
                      ?
                      { cursor: "pointer", background: "#0ab463" } 
                      :
                      null
                  }
                >
                  { !searching ? "SEARCH" : "SEARCHING..." }
                </button>
              </div>
            </div>

            <div className="results-div">
              <div className="results">
             Results
              </div>
              { loaded && result.length > 0 &&
              <ul className="results-list">
                {result.map(item => {
                  return (
                    <li className="result-item" key={item.created}>
                      { searchType === "people"
                        ? item.name
                        : item.title
                      }
                      <button className="detail-button">
                        <Link 
                          to={
                            searchType === "people" ?
                              `/${searchType}/${item.name}` :
                              `/${searchType}/${item.title}`}
                        >
                          SEE DETAILS
                        </Link>
                      </button>
                    </li>
                  )
                })}
              </ul>
              || 
              <div className="resutls-feedback-container">
                { !searching && 
              <div className="results-feedback-message">
                <p className="results-feedback-text">There are no matches.</p>
                <p className="results-feedback-text">Use the form to search for People or Movies.</p>
              </div>
              ||
              <div className="resutls-feedback-message">
                <p>Searching...</p>
              </div>
                }
              </div>
              }
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default Main;