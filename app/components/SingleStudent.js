import React from 'react'
import { connect } from 'react-redux'
import { deleteStudent, editStudent } from '../reducers/students'
import { Link } from 'react-router-dom'
import history from '../history'

class SingleStudent extends React.Component {
	render () {
		const studentId = this.props.studentId
		const student = this.props.students.filter(eachStudent => eachStudent.id === studentId)[0]
		const campuses = this.props.campuses
		const handleClick = this.props.handleClick
		const handleSubmit = this.props.handleSubmit

		return (
			<div className="container">
				<div>
					<h1>Student Record Profile and Information</h1>
				</div>
				<div>
					{student &&
						<div>
							<p><strong>Student:</strong> {student.name}</p>
							<p><strong>Email:</strong> {student.email}</p>
							<p><strong>Attending:</strong> {student.campusId ? <Link to={`/campus/${student.campusId}`}>{student.campus.name}</Link> : 'Not currently enrolled.'}</p>
						</div>
					}
				</div>
				<form onSubmit={(event) => handleSubmit(student, event)}>
					<h2>Edit Student's Info</h2>
					<input
		              type="text"
		              placeholder="Edit Student Name"
		              name="student"
		            />
		            <input
		              type="text"
		              placeholder="Edit Student Email"
		              name="email"
		            />
		            <select name="campus">
						<option key={0} value={null}>Change Campus</option>
						{campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
		            </select>
		            <button type="submit">
			            Submit
			         </button>
				</form>
				<div>
					<h2>Expel Student from Campus({student.campusId && student.campus.name})</h2>
					<button onClick={(event) => handleClick(student, event)}>Expel Student</button>
				</div>
			</div>

		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const studentId = Number(ownProps.match.params.id)

	return ({
		students: state.students,
		campuses: state.campuses,
		studentId: studentId
	})
}

const mapDispatchToProps = dispatch => {
	return ({
		handleClick (student, event) {
			event.preventDefault()
			dispatch(deleteStudent(student))
			history.push('/students')
		},
		handleSubmit (student, event) {
			event.preventDefault()
			const newInfo = {
				id: student.id,
				name: event.target.student.value,
				email: event.target.email.value,
				campusId: +event.target.campus.value
			}
			newInfo.name = newInfo.name ? newInfo.name : student.name
			newInfo.email = newInfo.email ? newInfo.email : student.email
			newInfo.campusId = newInfo.campusId ? newInfo.campusId : student.campusId
			dispatch(editStudent(newInfo))
		}
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
