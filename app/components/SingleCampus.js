import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SingleCampus extends React.Component {
	render () {
		return (
			<div>
				<div>
					<h1>Welcome to SingleCampus Page</h1>
					<h1>List of Students: </h1>
				</div>
				<div>
					<Link to="/student">A student from a list</Link>
				</div>
			</div>

		)
	}
}

export default connect()(SingleCampus)
