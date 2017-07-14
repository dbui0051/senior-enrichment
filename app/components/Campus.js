import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postCampus } from '../reducers/campuses'

class Campus extends React.Component {
	render () {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit}>
					<input
		              type="text"
		              placeholder="Add Campus"
		              name="campus"
		            />
		            <button type="submit">
			            Submit
			         </button>
				</form>
				<h1>Campuses List</h1>
				<div>
					<ul>
						{this.props.campuses.length > 0 && this.props.campuses.map(campus => {
							return (
								<li key={campus.id}>
									<Link to={`/campus/${campus.id}`}>
										{campus.name}
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
		campuses: state.campuses
	})
}

const mapDispatchToProps = dispatch => {
	return ({
		handleSubmit (event) {
			event.preventDefault()
			const newCampus = {name: event.target.campus.value}
			dispatch(postCampus(newCampus))
		}
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)
