import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Student extends React.Component {
	render () {
		return (
			<div>
				<h1>Student List</h1>
				<div>
					<ul>
						{this.props.students && this.props.students.map(student => {
							return (
								<li key={student.id}>
									<span>Student: {student.name} and Email: {student.email}</span>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		students: state.students
	})
}

export default connect(mapStateToProps)(Student)
