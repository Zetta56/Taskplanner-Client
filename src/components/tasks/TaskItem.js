import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {updateTask, selectAccordion, deselectAccordion} from "../../actions";
import CustomEditable from "../CustomEditable";
import "react-datepicker/dist/react-datepicker.css";

class TaskItem extends React.Component {
	//Note: onTitleClick refers to accordion title, not task title
	onTitleClick = (index) => {
		if(this.props.selected.includes(index)) {
			this.props.deselectAccordion(index);
		} else {
			this.props.selectAccordion(index);
		};
	};

	onCheckClick = (e) => {
		e.stopPropagation();
		this.props.updateTask({done: !this.props.task.done}, this.props.task._id)
	};

	onEditableSubmit = (text, type) => {
		this.props.updateTask({[type]: text}, this.props.task._id);
	};

	renderTaskTitle = ({editDisabled, title, _id}) => {
		if(editDisabled) {
			return (
				<Link to={`/tasks/${_id}`} onClick={(e) => e.stopPropagation()}>{title}</Link>
			);
		} else {
			return (
				<CustomEditable
					text={title}
					editDisabled={editDisabled}
					onEditableSubmit={this.onEditableSubmit}
					type="title" />
			);
		};
	};

	renderDate = ({editDisabled, date}) => {
		if(editDisabled) {
			return <span>{moment(date).format("MMM DD, YYYY")}</span>
		} else {
			//Note: Datepicker only accepts Date object, not ISO Date string
			return <DatePicker
						selected={moment(date)._d}
						onChange={(pickedDate) => this.props.updateTask({date: pickedDate || Date.now()}, this.props.task._id)} />
		};
	};

	render() {
		if(!this.props.selected) {
			return null;
		};

		const task = this.props.task,
			  active = this.props.selected.includes(this.props.index) ? "active" : "",
			  editting = task.editDisabled ? "" : "editting",
			  editIcon = task.editDisabled ? "edit" : "check",
			  done = task.done ? "done" : "",
			  dateDetails = moment(task.date).isSameOrAfter(moment(Date.now()).add(1, "week"))
							  ? {timing: "later", message: "> 1 week from now"}
							  : moment(task.date).isSameOrAfter(moment(Date.now()).add(3, "day"))
								  ? {timing: "soon", message: "3-7 days from now"}
								  : moment(task.date).isSameOrAfter(moment(Date.now()))
								  		? {timing: "immediate", message: "< 3 days from now"}
								  		: {timing: "late", message: "Overdue"}

		return (
			<React.Fragment>
				<div className={`title ${active} ${done || editting}`} onClick={() => this.onTitleClick(this.props.index)}>
					<div className="dateDetails">
						<div className={`dateColor ${done || dateDetails.timing}`} onClick={(e) => e.stopPropagation()}></div>
						<div className={`ui left pointing ${done || dateDetails.timing} label`}>{dateDetails.message}</div>
					</div>
					<div className="ui checkbox">
						<input type="checkbox" onClick={(e) => this.onCheckClick(e)} />
						<label></label>
					</div>
					<div onClick={(e) => e.stopPropagation()} className={`taskTitle ${done}`}>{this.renderTaskTitle(task)}</div>
					<div className="icons" onClick={(e) => e.stopPropagation()}>
						<Link to={`/tasks/${task._id}/delete`} className="ui red button">
							<i className="trash icon" />
						</Link>
						<button
							className={`ui edit button ${editting}`}
							onClick={() => this.props.updateTask({editDisabled: !task.editDisabled}, this.props.task._id)}
						>
							<i className={`${editIcon} icon`} />
						</button>
					</div>
					<div className={`date ${done}`} onClick={(e) => e.stopPropagation()}>{this.renderDate(task)}</div>
				</div>
				<div className={`content ${active} ${done || editting}`}>
					<CustomEditable
						text={task.description || "Enter a description here..."}
						editDisabled={task.editDisabled}
						onEditableSubmit={this.onEditableSubmit}
						type="description" />
				</div>
			</React.Fragment>
		);
	};
};

const mapStateToProps = (state) => {
	return {selected: state.click.accordion};
};

export default connect(mapStateToProps, {updateTask, selectAccordion, deselectAccordion})(TaskItem);