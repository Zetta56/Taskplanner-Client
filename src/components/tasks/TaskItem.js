import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {updateTask, selectAccordion, deselectAccordion} from "../../actions";
import CustomEditable from "../CustomEditable";
import TaskItemLeft from "./TaskItemLeft"
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

	onEditSubmit = () => {
		this.props.updateTask({editDisabled: !this.props.task.editDisabled}, this.props.task._id);
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
			  done = task.done ? "done" : "";

		return (
			<React.Fragment>
				<div className={`title ${active} ${editting} ${done}`} onClick={() => this.onTitleClick(this.props.index)}>
					<input type="checkbox" id={`showRight ${task._id}`} className="showBox" />
					<label htmlFor={`showRight ${task._id}`} className="ui show button"><i className="chevron left icon"></i></label>
					<TaskItemLeft task={task} />
					<span className="taskItemRight" onClick={(e) => e.stopPropagation()}>
						<div className="date">{this.renderDate(task)}</div>
						<div className="icons">
							<button className="ui red button"><Link to={`/tasks/${task._id}/delete`}><i className="trash icon" /></Link></button>
							<button className="ui edit button" onClick={() => this.onEditSubmit()}><i className={`${editIcon} icon`} /></button>
						</div>
					</span>
				</div>
				<div className={`content ${active} ${editting} ${done}`}>
					<CustomEditable
						text={task.description || "Enter a description here..."}
						editDisabled={task.editDisabled}
						onEditableSubmit={(text, type) => this.props.updateTask({[type]: text}, this.props.task._id)}
						type="description" />
				</div>
			</React.Fragment>
		);
	};
};

const mapStateToProps = (state) => {
	return {selected: state.accordion};
};

export default connect(mapStateToProps, {updateTask, selectAccordion, deselectAccordion})(TaskItem);