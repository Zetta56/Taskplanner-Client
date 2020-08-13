import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {
	render() {
		return (
			<div className="ui blue inverted pointing menu">
				<div className="ui container">
					<Link to="/" className="header item">TaskPlanner</Link>
					<div className="inverted right menu">
						<Link to="/login" className="item">Login</Link>
						<Link to="/register" className="item">Sign Up</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default Header;