import React from "react";
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {Link} from "react-router-dom";
import history from "../../history";
import {createTask} from "../../actions";
import Modal from "../Modal";

class TaskCreate extends React.Component {
	onFormSubmit = (formValues) => {
		this.props.createTask(formValues);
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

	renderForm = () => {
		return (
			<form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
				<Field name="title" component={this.renderInput} label="Title" inputType="text" />
				<Field name="description" component={this.renderTextArea} label="Description" placeholder="Enter a description..." />
				<Field name="date" component={this.renderInput} label="Due Date" inputType="date" />
				<button className="ui primary button">Submit</button>
				<Link to="/" className="ui button">Cancel</Link>
			</form>
		);
	};

	render() {
		return (
			<Modal
				header="Create A New Task"
				content={this.renderForm()}
				onDismiss={() => history.push("/")} />
		);
	}
};

const formWrapped = reduxForm({
	form: "TaskCreate",
	initialValues: {title: "New Task"}
})(TaskCreate);

export default connect(null, {createTask})(formWrapped);