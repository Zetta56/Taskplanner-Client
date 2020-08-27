import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {createTask, selectCreate} from "../../actions";
import Modal from "../Modal";

class TaskCreateAlt extends React.Component {
	onCreateClick = () => {
		this.props.selectCreate();
		
		this.props.createTask({
			title: "New Task",
			description: "Enter a description here...",
			date: Date.now()
		});
	};

	renderButtons = () => {
		return (
			<React.Fragment>
				<button className="ui primary button" onClick={this.onCreateClick}>Confirm</button>
				<Link to="/" className="ui button">Cancel</Link>
			</React.Fragment>
		);
	};

	render() {
		return (
			<Modal
			 	header="Create Confirmation"
			 	content="Are you sure you want to create a new task without logging in? Your task will not be saved."
			 	buttons={this.renderButtons()} />
		);
	}
};

export default connect(null, {createTask, selectCreate})(TaskCreateAlt);