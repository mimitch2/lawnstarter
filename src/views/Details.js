import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Details.scss'
import { fetchData, setDetailsLoaded, dataLoaded  } from "../actions";

class Details extends Component {

  componentDidMount = () => {
    this.reset()
    this.props.fetchData(this.props.match.params.type, this.props.match.params.id)
  }

  componentDidUpdate = (prevProps) => { 
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.reset()
      this.props.fetchData(this.props.match.params.type, this.props.match.params.id)
    }
  }

  reset = () => {
    this.props.setDetailsLoaded(false)
    this.props.dataLoaded(false)
  }

  render() {
    const { id, type } = this.props.match.params
    const { filmOrCharLoaded, filmOrChar, details, detailsLoaded } = this.props
    return (
      <div className="Details" ref="detailsRef">
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
                  null
              }
            >
              { type === "people" && filmOrCharLoaded &&
            <ul className="details-list">
              <li className="details-list-item">
                Birth Year: {filmOrChar[0].birth_year}
              </li>
              <li className="details-list-item">
                Gender: {filmOrChar[0].gender}</li>
              <li className="details-list-item">
                Eye Color: {filmOrChar[0].birth_year}
              </li>
              <li className="details-list-item">
                Hair Color: {filmOrChar[0].eye_color}
              </li>
              <li className="details-list-item">
                Height: {filmOrChar[0].hair_color}
              </li>
              <li className="details-list-item">
                Mass: {filmOrChar[0].mass}
              </li>
            </ul>

              || filmOrCharLoaded &&
              <div className="opening-crawl-text">
                <div>{ filmOrChar[0].opening_crawl } </div>
              </div>
              || !filmOrCharLoaded &&
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
                      to={`/${type === "people" ? "films" : "people"}/${detail}`} key={ i }
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filmOrChar: state.filmOrChar,
    filmOrCharLoaded: state.filmOrCharLoaded,
    details: state.details,
    detailsLoaded: state.detailsLoaded
  };
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (type, id) => {
      const action = fetchData(type, id);
      dispatch(action);
    },
    setDetailsLoaded: (bool) => {
      const action = setDetailsLoaded(bool);
      dispatch(action);
    },
    dataLoaded: (bool) => {
      const action = dataLoaded(bool);
      dispatch(action);
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
