import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchTasks, createTask, selectDropdown} from "../../actions";
import TaskItem from "./TaskItem";
import "./TaskList.css";

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

	onDropdownClick = (filter, index) => {
		this.props.selectDropdown(index);
		this.props.fetchTasks(filter);
	};

	renderListItem = () => {
		return this.props.tasks.map((task, index) => {
			return <TaskItem task={task} index={index} key={task._id} />
		});
	};

	renderDropdownItem = (filters) => {
		return filters.map((filter, index) => {
			return <div className="item" onClick={() => this.onDropdownClick(filter, index)} key={filter}>{filter}</div>
		});
	};

	renderLists = () => {
		if(this.props.tasks && this.props.tasks.length !== 0) {
			return <div className="ui styled accordion">{this.renderListItem()}</div>
		};
	};

	renderDeleteButton = () => {
		//Checks if there are any checked off tasks
		if(this.props.tasks.filter(task => task.done === true).length !== 0) {
			return <Link to="/tasks/completed/delete" className="ui red button">Delete Completed</Link>
		};
	};

	render() {
		const filters = ["Alphabetical", "Newest", "Oldest"];

		return (
			<div id="taskList">
				<div className="listButtons">
					<button className="ui blue button" onClick={() => this.onCreateClick()}>
						<i className="plus icon" />
						Create New Task
					</button>
					<div className="ui compact menu">
						<div className="ui simple dropdown item">
							{filters[this.props.selected] || "Sort By..."}
							<i className="dropdown icon" />
							<div className="menu">{this.renderDropdownItem(filters)}</div>
						</div>
					</div>
					{this.renderDeleteButton()}
				</div>
				{this.renderLists()}
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {tasks: Object.values(state.tasks), isLoggedIn: state.auth.isLoggedIn, selected: state.menu.dropdown};
};

export default connect(mapStateToProps, {fetchTasks, createTask, selectDropdown})(TaskList);