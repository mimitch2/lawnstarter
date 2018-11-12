export const fetchData = (type, id) => {
  return async function(dispatch) {
    try {
      const getData = await fetch(`https://swapi.co/api/${type}/?search=${id}`)
      const result = await getData.json()
      dispatch(setData(result.results))
      dispatch(dataLoaded(true))
      if (type === "people") {
        dispatch(getDetails(result.results[0].films, "films"))
      } else {
        dispatch(getDetails(result.results[0].characters, "people"))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const setData = (result) => {
  return {
    type: "SET_DATA",
    value: result
  };
}

export const dataLoaded = (bool) => {
  return {
    type: "DATA_LOADED",
    value: bool
  };
}

export const getDetails = (array, type) => {
  return async function(dispatch) {
    dispatch(setDetailsLoaded(false))
    let tempArr = []
    for (let i = 0; i < array.length; i++) {
      try {
        const getData = await fetch(array[i])
        const result = await getData.json()
        if (type === "people") {
          tempArr.push(result.name) 
        } else {
          tempArr.push(result.title)
        }
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(setDetails(tempArr))
    dispatch(setDetailsLoaded(true))
  }
}

export const setDetails = (result) => {
  return {
    type: "SET_DETAILS",
    value: result
  };
}

export const setDetailsLoaded = (bool) => {
  return {
    type: "DETAILS_LOADED",
    value: bool
  };
}