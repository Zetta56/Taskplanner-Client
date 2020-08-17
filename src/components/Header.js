import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions";

class Header extends React.Component {
	renderAuth = () => {
		if(this.props.isLoggedIn === null) {
			return;
		} else if(this.props.isLoggedIn) {
			return (
				<Link to="#" className="item" onClick={this.props.logout}>Logout</Link>
			);
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
		return (
			<div className="ui blue inverted top fixed pointing menu" id="header">
				<div className="ui container">
					<Link to="/" className="header item">TaskPlanner</Link>
					<div className="inverted right menu">
						{this.renderAuth()}
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth.isLoggedIn};
};

export default connect(mapStateToProps, {logout})(Header);