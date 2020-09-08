import React from "react";
import {Link} from "react-router-dom";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../actions";
import "./UserForm.css";

class Login extends React.Component {
	onGoogleClick = async () => {
		await window.gapi.auth2.getAuthInstance().signIn();
		this.props.login({googleToken: window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token});
	};

	renderGoogle = () => {
		if(this.props.match && this.props.match.path === "/login") {
			return (
				<React.Fragment>
					<button className="googleLogin" onClick={() => this.onGoogleClick()}></button>
					<div className="ui inverted horizontal divider">Or</div>
				</React.Fragment>
			);
		};
	};

	renderInput = ({input, placeholder, inputType}) => {
		return <input {...input} type={inputType} placeholder={placeholder} className="field" />
	};
	
	render() {
		return (
			<div className="userForm ui one column stackable grid">
				<div className="eight wide column">
					<h2>Login</h2>
					{this.renderGoogle()}
					<form className="ui form" onSubmit={this.props.handleSubmit((formValues) => this.props.login(formValues))}>
						<Field name="username" component={this.renderInput} placeholder="Username" inputType="text" />
						<Field name="password" component={this.renderInput} placeholder="Password" inputType="password" />
						<button className="ui blue button" id="submitButton">Submit</button>
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