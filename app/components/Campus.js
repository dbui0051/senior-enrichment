import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Campus extends React.Component {
	render () {
		return (
			<div>
				<h1>Campuses List</h1>
				<div>
					<ul>
						{this.props.campuses && this.props.campuses.map(campus => {
							return (
								<li key={campus.id}>
									{campus.name}
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
		campuses: state.campuses
	})
}

export default connect(mapStateToProps)(Campus)
