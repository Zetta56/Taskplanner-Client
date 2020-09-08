import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions";

class Header extends React.Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logout();
		if(window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
			window.gapi.auth2.getAuthInstance().signOut();
		};
	};

	renderAuth = () => {
		if(this.props.isLoggedIn === null) {
			return;
		} else if(this.props.isLoggedIn) {
			return <Link to="/" className="item" onClick={(e) => this.onLogoutClick(e)}>Logout</Link>
		} else {
			return (
				<React.Fragment>
					<Link to="/login" className="item">Login</Link>
					<Link to="/register" className="item">Sign Up</Link>
				</React.Fragment>
			);
		};
	};
	
	render() {
		const mainPage = this.props.isLoggedIn ? "/tasks" : "/";

		return (
			<div className="ui inverted top fixed pointing menu" id="header">
				<div className="ui container">
					<Link to={mainPage} className="header item">TaskPlanner</Link>
					<div className="inverted right menu">
						{this.renderAuth()}
					</div>
				</div>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth.isLoggedIn};
};

export default connect(mapStateToProps, {logout})(Header);