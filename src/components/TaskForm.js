import React from "react";
import {reduxForm, Field} from "redux-form";
import {Link} from "react-router-dom";

class TaskCreate extends React.Component {
	onFormSubmit = (formValues) => {
		this.props.onFormSubmit(formValues);
	};

	renderInput = ({input, label, inputType}) => {
		return (
			<React.Fragment>
				<label>{label}</label>
				<input type={inputType} {...input} style={{marginBottom: 20}} required />
			</React.Fragment>
		);
	};

	renderTextArea = ({input, label, placeholder}) => {
		return (
			<React.Fragment>
				<label>{label}</label>
				<textarea placeholder={placeholder} {...input} style={{marginBottom: 20}}></textarea>
			</React.Fragment>
		);
	};

	render() {
		return (
			<form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
				<Field name="title" component={this.renderInput} label="Title" inputType="text" />
				<Field name="description" component={this.renderTextArea} label="Description" placeholder="Enter a description..." />
				<Field name="date" component={this.renderInput} label="Due Date" inputType="date" />
				<button className="ui primary button">Submit</button>
				<Link to="/" className="ui button">Cancel</Link>
			</form>
		);
	}
};

export default reduxForm({
	form: "TaskForm"
})(TaskCreate);