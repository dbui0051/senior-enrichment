import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Student extends React.Component {
	render () {
		return (
			<div className="container">
				<h1>Students List</h1>
				<div>
					<ul>
						{this.props.students.length > 0 && this.props.students.map(student => {
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
