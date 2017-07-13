import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom';

class Navbar extends React.Component {

	render () {
		return (
			<nav>
				<div>
					<span>Navbar</span>
				</div>
				<div>
					<Link to="/">HOME</Link>
				</div>
				<div>
					<Link to="/students">Students</Link>
				</div>
				<div>
					<Link to="/campuses">Campuses</Link>
				</div>
			</nav>

		)
	}
}

const mapStateToProps = null

export default connect(mapStateToProps)(Navbar)
