import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import './Details.scss'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      loaded: false,
      details: [],
      detailsLoaded: false,
      show: false
    }
  }

  componentDidMount = () => {
    this.setState({show: true})
    this.fetchData()
  }

  componentDidUpdate = (prevProps) => { 
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.setState({
        details: [],
        detailsLoaded: false,
      })
      this.fetchData()
    }

    if (this.props.match.path === "/") {
      this.mounted = false;
    }
  }

  async getDetails (array) {
    const { type } = this.props.match.params
    let tempArr = []
    for (let i = 0; i < array.length; i++) {
      try {
        const getData = await fetch(array[i])
        const result = await getData.json()
        type === "films" 
          ? 
          tempArr = [...tempArr, result.name] 
          :
          tempArr = [...tempArr, result.title]
      } catch (error) {
        console.log(error)
      }
    }
    this.setState({
      details: tempArr,
      detailsLoaded: true
    })
  }

  async fetchData () {
    const { type, id } = this.props.match.params
    try {
      const getData = await fetch(`https://swapi.co/api/${type}/?search=${id}`)
      const result = await getData.json()
      this.setState({
        result: result.results,
        loaded: true
      })
      if (type === "people") {
        this.getDetails(result.results[0].films)
      } else {
        this.getDetails(result.results[0].characters)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { id, type } = this.props.match.params
    const { loaded, result, details, detailsLoaded, show } = this.state
    return (
      <div className="Details">
        <CSSTransition
          in={this.state.show}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="details-card">
            <div className="details-card-left">
              <p className="result-name">
                { id }
              </p>
              <p className="details-title">
                { type === "people" ?
                  "Details" :
                  "Opening Crawl"
                }
              </p>
              <div className="details-wrapper"
                style ={
                  type === "people" ?
                    {height: "101px"} :
                    {minHeight: "206px"}
                }
              >
                { type === "people" && loaded &&
            <ul className="details-list">
              <li className="details-list-item">
                Birth Year: {result[0].birth_year}
              </li>
              <li className="details-list-item">
                Gender: {result[0].gender}</li>
              <li className="details-list-item">
                Eye Color: {result[0].birth_year}
              </li>
              <li className="details-list-item">
                Hair Color: {result[0].eye_color}
              </li>
              <li className="details-list-item">
                Height: {result[0].hair_color}
              </li>
              <li className="details-list-item">
                Mass: {result[0].mass}
              </li>
            </ul>

              || loaded &&
              <div className="opening-crawl-text">
                { result[0].opening_crawl } 
              </div>
              || !loaded &&
              <div className="details-loading">
                <p className="loading-text">Loading...</p> 
              </div>
                }
              </div>

              <button className="back-to-search-button">
                <Link to="/">
                BACK TO SEARCH
                </Link>
              </button>

            </div>

            <div className="details-card-right">
              <p className="details-right">
                { type === "people" ?
                  "Movies" :
                  "Characters"
                }
              </p>
              <div className="right-list-container">
                { detailsLoaded &&
                details.map((detail, i) => {
                  return (
                    <Link 
                      to={`/${type === "people" ? "films" : "people"}/${detail}`} key={detail}
                    >
                      {detail}{i == details.length - 1 ? "" : ", "}
                    </Link>
                  )
                })
                ||
                 <div className="details-loading">
                   <p className="loading-text">Loading...</p> 
                 </div>
                }
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
   

    )
  }
}

export default Details;