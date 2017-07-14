import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postStudent } from '../reducers/students'

class Student extends React.Component {
	render () {

		const students = this.props.students
		const campuses = this.props.campuses
		return (
			<div className="container">
				<h1>Students List</h1>
				<div>
					<ul>
						{students.length > 0 && students.map(student => {
							return (
								<li key={student.id}>
									<Link to={`/student/${student.id}`}>
										{student.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<div>
					<h2>Enroll a New Student</h2>
					<form onSubmit={this.props.handleSubmit}>
						<input
			              type="text"
			              placeholder="Add Student"
			              name="student"
			            />
			            <input
			              type="text"
			              placeholder="Insert Email"
			              name="email"
			            />
			            <select name="campus">
							<option key={0} value={null}>Select Campus</option>
								{campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
						</select>
			            <button type="submit">
				            Submit
				         </button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		students: state.students,
		campuses: state.campuses
	})
}

const mapDispatchToProps = dispatch => {
	return ({
		handleSubmit (event) {
			event.preventDefault()
			const newStudent = {
				name: event.target.student.value,
				email: event.target.email.value,
				campusId: +event.target.campus.value
			}
			console.log(newStudent)
			if (newStudent.name && newStudent.email && typeof newStudent.campusId === 'number') dispatch(postStudent(newStudent))
			return 'Not enough info submitted'
		}
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)
