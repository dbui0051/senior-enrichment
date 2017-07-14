import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
	render () {
		return (
			<div className="home">
				<div className="text-center text-inverted">
					<h1>Welcome to Home Page</h1>
				</div>
			</div>

		)
	}
}

export default connect()(Home)
