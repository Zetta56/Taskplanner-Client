import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchTasks, createTask} from "../../actions";
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

	renderCreateButton = () => {
		//Displays popup if signed out user is clicking create for the first time
		if(!this.props.isLoggedIn && !this.props.selectedCreate) {
			return (
				<Link to="/tasks/create" className="ui blue button">
					<i className="plus icon"></i>
					Create New Task
				</Link>
			);
		} else {
			return (
				<button className="ui blue button" onClick={this.onCreateClick}>
					<i className="plus icon"></i>
					Create New Task
				</button>
			);
		}
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

	renderAccordion = () => {
		if(this.props.tasks.length !== 0) {
			return (
				<div className="ui styled accordion">
					{this.renderList()}
				</div>
			);
		};
	};

	render() {
		return (
			<div id="taskList">
				{this.renderCreateButton()}
				{this.renderAccordion()}
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		tasks: Object.values(state.tasks),
		isLoggedIn: state.auth.isLoggedIn,
		selectedCreate: state.click.createButton
	};
};

export default connect(mapStateToProps, {fetchTasks, createTask})(TaskList);