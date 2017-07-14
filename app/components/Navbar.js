import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

	render () {
		return (
			<nav className="navbar navbar-collapse">
				<ul className="nav navbar-nav">
					<li><Link to="/"><h4>HOME</h4></Link></li>
					<li><Link to="/students"><h4>Students</h4></Link></li>
					<li><Link to="/campuses"><h4>Campuses</h4></Link></li>
				</ul>
			</nav>

		)
	}
}

const mapStateToProps = null

export default connect(mapStateToProps)(Navbar)
