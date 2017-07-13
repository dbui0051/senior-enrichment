import axios from 'axios'

const SET_CAMPUSES = 'SET_CAMPUSES'
const GET_CAMPUS = 'GET_CAMPUS'

const setCampuses = campuses => ({type: SET_CAMPUSES, campuses})
const getCampus = campus => ({type: GET_CAMPUS, campus})

export default function reducer (campuses = [], action) {

	switch (action.type) {

		case SET_CAMPUSES:
			return action.campuses

		case GET_CAMPUS:
			return action.campus

		default:
		return campuses
	}
}

export const fetchCampuses = () => dispatch => {
	axios.get('/api/campus')
	.then(res => dispatch(setCampuses(res.data)))
	.catch(err => console.log(err))
}
