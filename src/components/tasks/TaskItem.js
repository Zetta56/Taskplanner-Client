import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import sanitize from "sanitize-html-react";
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

	onEditableSubmit = (e, type) => {
		let sanitizedText = sanitize(e.target.textContent);
		this.props.updateTask({[type]: sanitizedText}, this.props.task._id);
	};

	renderTaskTitle = ({editDisabled, title, _id}) => {
		if(editDisabled) {
			return (
				<Link to={`/tasks/${_id}`} onClick={(e) => e.stopPropagation()}>{title}</Link>
			);
		} else {
			return (
				<div className="taskTitle">
				<CustomEditable
					text={title}
					editDisabled={editDisabled}
					onEditableSubmit={this.onEditableSubmit}
					type="title" />
				</div>
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
			  editIcon = task.editDisabled ? "edit" : "check";

		return (
			<React.Fragment>
				<div className={`title ${active} ${editting}`} onClick={() => this.onTitleClick(this.props.index)}>
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
					<div className="date" onClick={(e) => e.stopPropagation()}>{this.renderDate(task)}</div>
					<div onClick={(e) => e.stopPropagation()} className="taskTitle">{this.renderTaskTitle(task)}</div>
				</div>
				<div className={`content ${active} ${editting}`}>
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