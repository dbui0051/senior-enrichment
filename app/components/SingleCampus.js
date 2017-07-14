import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postStudent } from '../reducers/students'

class SingleCampus extends React.Component {

	render () {
		const campusId = this.props.campusId
		const filteredStudents = this.props.students.filter(student => student.campusId === campusId)
		const selectedCampus = this.props.campuses.filter(campus => campus.id === this.props.campusId)[0]

		return (
			<div>
				<div>
					<h1>Welcome to {selectedCampus.name && selectedCampus.name}'s Home Page</h1>
					<h2>List of Attending Students: </h2>
				</div>
				<div>
					<ul>
						{filteredStudents && filteredStudents.map(student => {
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
					<h2>Campus Details:</h2>
					<p>It's been around for awhile. It's not bad</p>
				</div>
				<h2>Enroll a New Student</h2>
				<form onSubmit={(event) => this.props.handleSubmit(this.props.campusId, event)}>
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
		            <button type="submit">
			            Submit
			         </button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const campusId = Number(ownProps.match.params.id)

	return ({
		students: state.students,
		campuses: state.campuses,
		campusId: campusId
	})
}

const mapDispatchToProps = dispatch => {
	return ({
		handleSubmit (campusId, event) {
			event.preventDefault()
			const newStudent = {
				name: event.target.student.value,
				email: event.target.email.value,
				campusId: campusId
			}
			dispatch(postStudent(newStudent))
		}
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
