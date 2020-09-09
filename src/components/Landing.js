import React from "react";
import {connect} from "react-redux";
import {login, createUser} from "../actions";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./Landing.css";

class StepItem extends React.Component {
	render() {
		return (
			<div id="landing">
				<div className="header">
					<h1>Taskplanner</h1>
					<p>A simple task organizer for your everyday responsibilities</p>
				</div>
				<div className="ui inverted segment">
			      	<span className="login"><Login /></span>
			    	<div className="ui inverted horizontal divider">Or</div>
			    	<div className="ui inverted vertical divider">Or</div>
				    <span className="register"><Register /></span>
				</div>
			</div>
		);
	};
};

export default connect(null, {login, createUser})(StepItem);