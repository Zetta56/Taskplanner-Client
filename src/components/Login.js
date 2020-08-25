import React from "react";
import {Link} from "react-router-dom";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {login} from "../actions";
import "./UserForm.css";

class Login extends React.Component {
	onFormSubmit = (formValues) => {
		this.props.login(formValues);
	};

	renderInput = ({input, placeholder, inputType}) => {
		return (
			<div className="field">
				<input {...input} type={inputType} placeholder={placeholder} />
			</div>
		);
	};
	
	render() {
		return (
			<div className="ui one column stackable grid" id="userForm">
				<div className="eight wide column">
					<form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
						<h2>Login</h2>
						<Field name="username" component={this.renderInput} placeholder="Username" inputType="text" />
						<Field name="password" component={this.renderInput} placeholder="Password" inputType="password" />
						<button className="ui primary button" id="submitButton">Submit</button>
					</form>
					<div className="registerMessage">
						Don't have an account?
						<Link to="/register">Sign up</Link>
					</div>
				</div>
			</div>
		);
	};
};

const reduxWrapped = reduxForm({
	form: "Login"
})(Login);

export default connect(null, {login})(reduxWrapped);