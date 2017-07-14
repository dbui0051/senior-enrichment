import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postStudent } from '../reducers/students'
import { deleteCampus, editCampus } from '../reducers/campuses'
import history from '../history'

class SingleCampus extends React.Component {

	render () {
		const campusId = this.props.campusId
		const filteredStudents = this.props.students.filter(student => student.campusId === campusId)
		const selectedCampus = this.props.campuses.filter(campus => campus.id === this.props.campusId)[0]

		return (
			<div className="container">
				<div>
					<h1>Welcome to <em>{selectedCampus.name && selectedCampus.name}</em> Home Page</h1>
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
					<p>{selectedCampus.details && selectedCampus.details}</p>
				</div>
				<div>
					<h3>Enroll a New Student into {selectedCampus.name && selectedCampus.name}</h3>
					<form onSubmit={(event) => this.props.handleSubmit(campusId, event)}>
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
				<div>
					<div>
					<form onSubmit={(event) => this.props.updateCampus(selectedCampus, event)}>
						<h3>Edit Campus Details:</h3>
						<textarea rows="5" cols="100" type="text" name="details" />
						<button className="btn-primary btn">Update</button>
					</form>
				</div>
				</div>
				<div>
					<form onSubmit={(event) => this.props.deleteCampus(selectedCampus, event)}>
						<h3>Close down {selectedCampus.name} Campus</h3>
						<p>To delete campus records, input campus name and click 'Delete'</p>
						<input type="text" placeholder="To Delete" name="campus" />
						<button className="btn-danger btn">Delete</button>
					</form>
				</div>
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
			if (newStudent.name && newStudent.email) dispatch(postStudent(newStudent))
			else return 'No info submitted'
		},
		deleteCampus (campus, event) {
			event.preventDefault()
			const campusName = event.target.campus.value
			if (campusName !== campus.name) return 'Failed to delete'
			else dispatch(deleteCampus(campus))
			history.push('/campuses')
		},
		updateCampus (campus, event) {
			event.preventDefault()
			const edittedCampus = {
				details: event.target.details.value,
				id: +campus.id,
				name: campus.name
			}
			if (!edittedCampus.details) return 'Nothing to update'
			else dispatch(editCampus(edittedCampus))
		}
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
