import axios from 'axios'

const SET_STUDENTS = 'SET_STUDENTS'
const GET_STUDENT = 'GET_STUDENT'
const ADD_STUDENT = 'ADD_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

const setStudents = students => ({type: SET_STUDENTS, students})
const getStudent = student => ({type: GET_STUDENT, student})
const addStudent = newStudent => ({type: ADD_STUDENT, newStudent})
const removeStudent = student => ({type: REMOVE_STUDENT, student})
const updateStudent = student => ({type: UPDATE_STUDENT, student})

export default function reducer (students = [], action) {

	switch (action.type) {

		case SET_STUDENTS:
			return action.students

		case GET_STUDENT:
			return action.student

		case ADD_STUDENT:
			return [...students, action.newStudent]

		case REMOVE_STUDENT:
			return students.filter(student => student.id !== +action.student.id)

		case UPDATE_STUDENT:
	      return students.map(student => (
	        action.student.id === student.id ? action.student : student
	      ))

		default:
		return students
	}
}

export const fetchStudents = () => dispatch => {
	axios.get('/api/student')
	.then(res => dispatch(setStudents(res.data)))
	.catch(err => console.log(err))
}

export const fetchStudent = student => dispatch => {
	axios.get(`/api/student/${student.id}`)
	.then(res => dispatch(addStudent(res.data)))
	.catch(err => console.log(err))
}

export const postStudent = newStudent => dispatch => {
	axios.post('/api/student', newStudent)
	.then(res => dispatch(fetchStudent(res.data)))
	.catch(err => console.log(err))
}

export const deleteStudent = student => dispatch => {
	dispatch(removeStudent(student))
	axios.delete(`/api/student/${student.id}`)
	.catch(err => console.log(err))
}

export const editStudent = student => dispatch => {
	axios.put(`/api/student/${student.id}`, student)
	.then(() => dispatch(fetchStudents()))
	.catch(err => console.log(err))
}

