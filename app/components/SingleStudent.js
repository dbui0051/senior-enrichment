import React from 'react'
import { connect } from 'react-redux'

class SingleStudent extends React.Component {
	render () {
		return (
			<div>
				<div>
					<h1>Welcome to SingleStudent Page</h1>
					<h2>Name: </h2>
					<h2>Email: </h2>
					<h2>Campus: </h2>
				</div>
			</div>

		)
	}
}

export default connect()(SingleStudent)
