import React from "react";
import {connect} from "react-redux"
import {fetchTasks, createTask} from "../../actions";
import TaskItem from "../TaskItem";

class TaskList extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	};

	onCreateClick = () => {
		this.props.createTask({
			title: "New Task",
			description: "Enter a description here..."
		})
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
				<button className="ui primary button" onClick={this.onCreateClick}>
					<i className="plus icon"></i>
					Create New Task
				</button>
				<div className="ui styled accordion">
					{this.renderList()}
				</div>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {tasks: Object.values(state.tasks), isSignedIn: state.auth};
};

export default connect(mapStateToProps, {fetchTasks, createTask})(TaskList);