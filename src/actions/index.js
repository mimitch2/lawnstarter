export async function fetchData(type, id) {
  try {
    const getData = await fetch(`https://swapi.co/api/${type}/?search=${id}`)
    const result = await getData.json()
    setData(result)
    dataLoaded(true)
    if (type === "people") {
      getDetails(result.results[0].films)
    } else {
      getDetails(result.results[0].characters)
    }
  } catch (error) {
    console.log(error)
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

export async function getDetails(array, type) {
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
  setDetails(result)
  detailsLoaded(true)
}

export const setDetails = (result) => {
  return {
    type: "SET_DETAILS",
    value: result
  };
}

export const detailsLoaded = (bool) => {
  return {
    type: "DETAILS_LOADED",
    value: bool
  };
}