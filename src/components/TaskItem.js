import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {updateTask, selectAccordion, deselectAccordion} from "../actions";
import TaskEditable from "./TaskEditable";
import "react-datepicker/dist/react-datepicker.css";

class TaskItem extends React.Component {
	onTitleClick = (index) => {
		if(this.props.selected.includes(index)) {
			this.props.deselectAccordion(index);
		} else {
			this.props.selectAccordion(index);
		};
	};

	onEditClick = (e, editDisabled, taskId) => {
		e.preventDefault();
		this.props.updateTask({editDisabled: !editDisabled}, taskId);
	};

	renderEditButton = (editDisabled, taskId) => {
		if(editDisabled) {
			return (
				<button className="ui yellow button" onClick={(e) => this.onEditClick(e, editDisabled, taskId)}>
					<i className="edit icon" />
				</button>
			);
		} else {
			return (
				<button className="ui green button" onClick={(e) => this.onEditClick(e, editDisabled, taskId)}>
					<i className="check icon" />
				</button>
			);
		};
	};

	renderDate = ({editDisabled, _id, date}) => {
		if(editDisabled) {
			return <span>{moment(date).format("MMM DD, YYYY")}</span>
		} else {
			//Note: Datepicker only accepts Date object, not ISO Date string
			return <DatePicker selected={moment(date)._d} onChange={(pickedDate) => this.props.updateTask({date: pickedDate}, _id)} />
		};
	};

	render() {
		const task = this.props.task,
			  index = this.props.index,
			  active = this.props.selected.includes(index) ? "active" : "",
			  yellow = task.editDisabled ? "" : "LemonChiffon";

		return (
			<React.Fragment>
				<div className={`title ${active}`} onClick={() => this.onTitleClick(index)} style={{backgroundColor: `${yellow}`}}>
					<div className="icons" onClick={(e) => e.stopPropagation()}>
						<Link to={`/tasks/${task._id}/delete`} className="ui red button">
							<i className="trash icon" />
						</Link>
						{this.renderEditButton(task.editDisabled, task._id)}
					</div>
					<div className="date" onClick={(e) => e.stopPropagation()}>
						{this.renderDate(task)}
					</div>
					<Link to="#" onClick={(e) => e.stopPropagation()}>
						<TaskEditable text={task.title || "New Task"} task={task} type="title" />
					</Link>
				</div>
				<div className={`content ${active}`} style={{backgroundColor: `${yellow}`}}>
					<TaskEditable task={task} text={task.description || "Enter a description here..."} type="description" />
				</div>
			</React.Fragment>
		);
	};
};

const mapStateToProps = (state) => {
	return {selected: state.accordion};
};

export default connect(mapStateToProps, {updateTask, selectAccordion, deselectAccordion})(TaskItem);