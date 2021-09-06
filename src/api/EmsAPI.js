// const BASE_URL = "http://localhost:8000/"
const BASE_URL = "https://personal-project-ems-backend.herokuapp.com/"


const fetchAilmentByID = async (ailmentID) => {
  let url = `${BASE_URL}api/ailments/${ailmentID}/`
  return await fetch(url)
    .then((response) => response.json())
}

const fetchAilments = async () => {
  let url = `${BASE_URL}api/ailments/`
  return await fetch(url)
    .then((response) => response.json())
}

const fetchDemographicByID = async (demographicID) => {
  let url = `${BASE_URL}api/demographics/${demographicID}/`
  return await fetch(url)
    .then((response) => response.json())
}

const addAilment = async (ailmentObject) => {
  return await fetch(`${BASE_URL}api/ailments/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(ailmentObject)
  }).then((response) => response.json())
}

const deleteAilment = async (ailmentID) => {
  return await fetch(`${BASE_URL}api/ailments/${ailmentID}/`, {
    method: 'DELETE'
  }).then(() => {return {'success': true}})
}

const addDemographic = async (demographicObject) => {
  return await fetch(`${BASE_URL}api/demographics/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(demographicObject)
  }).then((response) => response.json())
}

const updateDemographic = async (demographicID, demographicParams) => {
  return await fetch(`${BASE_URL}api/demographics/${demographicID}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(demographicParams)
  }).then((response) => response.json())
}

const deleteDemographic = async (demographicID) => {
  return await fetch(`${BASE_URL}api/demographics/${demographicID}/`, {
    method: 'DELETE'
  }).then(() => {return {'success': true}})
}


const myExport = {
  fetchAilmentByID,
  fetchAilments,
  fetchDemographicByID,
  addAilment,
  deleteAilment,
  addDemographic,
  updateDemographic,
  deleteDemographic
}

export default myExport