import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchTasks, createTask, deleteInactiveTasks} from "../../actions";
import TaskItem from "./TaskItem";
import "./TaskList.css"

class TaskList extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	};

	onCreateClick = () => {
		this.props.createTask({
			title: "New Task",
			description: "Enter a description here...",
			date: Date.now()
		});
	};

	renderDeleteButton = () => {
		if(this.props.tasks.filter(task => task.done === true).length !== 0) {
			return <button className="ui red button" onClick={this.props.deleteInactiveTasks}>Delete Inactive Tasks</button>
		};
	};

	renderList = () => {
		return this.props.tasks.map((task, index) => {
			return <TaskItem task={task} index={index} key={task._id} />
		});
	};

	renderAccordion = () => {
		if(this.props.tasks && this.props.tasks.length !== 0) {
			return <div className="ui styled accordion">{this.renderList()}</div>
		};
	};

	render() {
		return (
			<div id="taskList">
				<button className="ui blue button" onClick={() => this.onCreateClick()}>
					<i className="plus icon"></i>
					Create New Task
				</button>
				{this.renderDeleteButton()}
				{this.renderAccordion()}
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {tasks: Object.values(state.tasks), isLoggedIn: state.auth.isLoggedIn};
};

export default connect(mapStateToProps, {fetchTasks, createTask, deleteInactiveTasks})(TaskList);