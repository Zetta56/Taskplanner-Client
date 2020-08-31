import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";
import {updateTask} from "../../actions";
import CustomEditable from "../CustomEditable";

class TaskItemLeft extends React.Component {
	getDateDetails = () => {
		const dateDetails = [
			{number: 1, unit: "week", urgency: "later", message: "> 1 week from now"},
			{number: 3, unit: "day", urgency: "soon", message: "3-7 days from now"},
			{number: 0, unit: "day", urgency: "immediate", message: "< 3 days from now"}
		];
		for(let i = 0; i < dateDetails.length; i++) {
			const {number, unit, urgency, message} = dateDetails[i];
			if(moment(this.props.task.date).isSameOrAfter(moment(Date.now()).add(number, unit))) {
				return {urgency, message};
			};
		};
		return {urgency: "late", message: "Overdue"};
	};

	renderTaskTitle = ({editDisabled, title, _id}) => {
		if(editDisabled) {
			return <Link to={`/tasks/${_id}`} onClick={(e) => e.stopPropagation()}>{title}</Link>
		} else {
			return <CustomEditable
						text={title || "New Task"}
						editDisabled={editDisabled}
						onEditableSubmit={(text, type) => this.props.updateTask({[type]: text}, this.props.task._id)}
						type="title" />
		};
	};
	render() {
		const task = this.props.task;

		return (
			<span className="taskItemLeft" onClick={(e) => e.stopPropagation()}>
				<div className="dateDetails">
					<div className={`dateColor ${this.getDateDetails().urgency}`}></div>
					<div className={`ui left pointing ${this.getDateDetails().urgency} label`}>{this.getDateDetails().message}</div>
				</div>
				<div className="ui checkbox">
					<input type="checkbox" checked={task.done} onChange={() => this.props.updateTask({done: !task.done}, task._id)} />
					<label></label>
				</div>
				<div className="taskTitle">{this.renderTaskTitle(task)}</div>
			</span>
		);
	};
};

const mapStateToProps = (state) => {
	return {selected: state.accordion};
};

export default connect(mapStateToProps, {updateTask})(TaskItemLeft);