import React from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history';
import Root from './components/Root'
import Home from './components/Home'
import Campus from './components/Campus'
import SingleCampus from './components/SingleCampus'
import Student from './components/Student'
import SingleStudent from './components/SingleStudent'
import { fetchCampuses } from './reducers/campuses'
import { fetchStudents } from './reducers/students'

class Routes extends React.Component {

	componentDidMount () {
	    this.props.fetchDatabase()
	 }

	render () {
		return (
			<Router history={history}>
				<div>
				<Root />
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route exact path="/campuses" component={ Campus } />
						<Route exact path="/campus" component={ SingleCampus } />
						<Route exact path="/students" component={ Student } />
						<Route exact path="/student" component={ SingleStudent } />
						<Route component={ Home } />
					</Switch>
				</div>
			</Router>
		)
	}
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
	fetchDatabase () {
		dispatch(fetchCampuses())
		dispatch(fetchStudents())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
