import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchTasks, createTask} from "../../actions";
import TaskItem from "../TaskItem";

class TaskList extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	};

	onCreateClick = () => {
		this.props.createTask({
			title: "New Task",
			description: "Enter a description here...",
			date: new Date(),
			editDisabled: false
		}, this.props.userId);
	};

	renderCreateButton = () => {
		if(this.props.userId) {
			return (
				<button className="ui primary button" onClick={this.onCreateClick}>
					<i className="plus icon"></i>
					Create New Task
				</button>
			);
		} else {
			return (
				<Link to="/tasks/create/confirm" className="ui primary button">
					<i className="plus icon"></i>
					Create New Task
				</Link>
			);
		};
	};

	renderList = () => {
		if(!this.props.tasks) {
			return null;
		};

		return this.props.tasks.map((task, index) => {
			return (
				<TaskItem task={task} index={index} key={task._id} />
			);
		});
	};

	render() {
		return (
			<div id="taskList">
				{this.renderCreateButton()}
				<div className="ui styled accordion">
					{this.renderList()}
				</div>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {tasks: Object.values(state.tasks), userId: state.auth.userId};
};

export default connect(mapStateToProps, {fetchTasks, createTask})(TaskList);