import React from "react";
import {reduxForm, Field} from "redux-form";

class Register extends React.Component {
	renderInput = ({input, label}) => {
		return (
			<div>
				<label>{label}</label>
				<input {...input} className="field" type="text" />
			</div>
		);
	};
	
	render() {
		return (
			<div className="ui one column stackable grid" id="userForm">
				<div className="eight wide column">
					<form className="ui form" onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
						<h2>{this.props.formTitle}</h2>
						{this.props.children}
						<Field name="username" component={this.renderInput} label="Username" />
						<Field name="password" component={this.renderInput} label="Password" />
						<br />
						<button className="ui primary button" id="submitButton">Submit</button>
					</form>
				</div>
			</div>
		);	
	};
};

export default reduxForm({
	form: "UserForm"
})(Register);