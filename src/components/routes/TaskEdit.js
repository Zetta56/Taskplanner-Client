import React from "react";
import {connect} from "react-redux";
import history from "../../history";
import {fetchTask, updateTask} from "../../actions";
import Modal from "../Modal";
import TaskForm from "../TaskForm";

class TaskEdit extends React.Component {
	componentDidMount() {
		this.props.fetchTask(this.props.match.params.id);
	};

	onFormSubmit = (formValues) => {
		this.props.updateTask(formValues, this.props.match.params.id);
	};

	render() {
		if(!this.props.task) {
			return null;
		};
		//Note: You date input can't have default value
		return (
			<Modal
				header={`Edit '${this.props.task.title}'`}
				content=
					<TaskForm 
						initialValues={{title: this.props.task.title, description: this.props.task.description}} 
						onFormSubmit={this.onFormSubmit} />
				onDismiss={() => history.push("/")} />
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {task: state.tasks[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchTask, updateTask})(TaskEdit);