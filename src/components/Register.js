import React from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {createUser} from "../actions";
import UserForm from "./UserForm";

class Register extends React.Component {
	onFormSubmit = (formValues) => {
		this.props.createUser(formValues);
	};

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
			<div>
				<UserForm formTitle="Create Your Account" onFormSubmit={this.onFormSubmit}>
					<Field name="email" component={this.renderInput} label="Email" />
				</UserForm>
			</div>
		);	
	};
};

const mapStateToProps = (state) => {
	return {users: state.users}
};

const reduxWrapped = reduxForm({
	form: "UserForm"
})(Register);

export default connect(mapStateToProps, {createUser})(reduxWrapped);
