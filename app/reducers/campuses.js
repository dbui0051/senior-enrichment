import axios from 'axios'

const SET_CAMPUSES = 'SET_CAMPUSES'
const GET_CAMPUS = 'GET_CAMPUS'
const ADD_CAMPUS = 'ADD_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

const setCampuses = campuses => ({type: SET_CAMPUSES, campuses})
const getCampus = campus => ({type: GET_CAMPUS, campus})
const addCampus = newCampus => ({type: ADD_CAMPUS, newCampus})
const removeCampus = campus => ({type: REMOVE_CAMPUS, campus})
const updateCampus = campus => ({type: UPDATE_CAMPUS, campus})

export default function reducer (campuses = [], action) {

	switch (action.type) {

		case SET_CAMPUSES:
			return action.campuses

		case GET_CAMPUS:
			return action.campus

		case ADD_CAMPUS:
			return [...campuses, action.newCampus]

		case REMOVE_CAMPUS:
			return campuses.filter(campus => campus.id !== +action.campus.id)

		case UPDATE_CAMPUS:
	      return campuses.map(campus => (
	        action.campus.id === campus.id ? action.campus : campus
	      ))

		default:
		return campuses
	}
}

export const fetchCampuses = () => dispatch => {
	axios.get('/api/campus')
	.then(res => dispatch(setCampuses(res.data)))
	.catch(err => console.log(err))
}

export const postCampus = newCampus => dispatch => {
	axios.post('/api/campus', newCampus)
	.then(res => dispatch(addCampus(res.data)))
	.catch(err => console.log(err))
}

export const deleteCampus = campus => dispatch => {
	dispatch(removeCampus(campus))
	axios.delete(`/api/campus/${campus.id}`)
	.catch(err => console.log(err))
}

export const editCampus = campus => dispatch => {
	axios.put(`/api/campus/${campus.id}`, campus)
	.then(() => dispatch(fetchCampuses()))
	.catch(err => console.log(err))
}

