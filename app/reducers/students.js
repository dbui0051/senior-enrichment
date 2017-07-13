import axios from 'axios'

const SET_STUDENTS = 'SET_STUDENTS'
const GET_STUDENT = 'GET_STUDENT'

const setStudents = students => ({type: SET_STUDENTS, students})
const getStudent = student => ({type: GET_STUDENT, student})

export default function reducer (students = [], action) {

	switch (action.type) {

		case SET_STUDENTS:
			return action.students

		case GET_STUDENT:
			return action.student

		default:
		return students
	}
}

export const fetchStudents = () => dispatch => {
	axios.get('/api/student')
	.then(res => dispatch(setStudents(res.data)))
	.catch(err => console.log(err))
}
