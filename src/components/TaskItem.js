import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import sanitize from "sanitize-html-react";
import {updateTask, selectAccordion, deselectAccordion} from "../actions";
import CustomEditable from "./CustomEditable";
import "react-datepicker/dist/react-datepicker.css";

class TaskItem extends React.Component {
	onTitleClick = (index) => {
		if(this.props.selected.includes(index)) {
			this.props.deselectAccordion(index);
		} else {
			this.props.selectAccordion(index);
		};
	};

	onEditClick = (e, editDisabled) => {
		e.preventDefault();
		this.props.updateTask({editDisabled: !editDisabled}, this.props.task._id);
	};

	onEditableSubmit = (e, type) => {
		let sanitizedText = sanitize(e.target.textContent);
		this.props.updateTask({[type]: sanitizedText}, this.props.task._id);
	};

	renderDate = ({editDisabled, date}) => {
		if(editDisabled) {
			return <span>{moment(date).format("MMM DD, YYYY")}</span>
		} else {
			//Note: Datepicker only accepts Date object, not ISO Date string
			return <DatePicker selected={moment(date)._d} onChange={(pickedDate) => this.props.updateTask({date: pickedDate}, this.props.task._id)} />
		};
	};

	renderEditButton = (editDisabled) => {
		if(editDisabled) {
			return (
				<button className="ui yellow button" onClick={(e) => this.onEditClick(e, editDisabled)}>
					<i className="edit icon" />
				</button>
			);
		} else {
			return (
				<button className="ui green button" onClick={(e) => this.onEditClick(e, editDisabled)}>
					<i className="check icon" />
				</button>
			);
		};
	};

	render() {
		const task = this.props.task,
			  active = this.props.selected.includes(this.props.index) ? "active" : "",
			  yellow = task.editDisabled ? "" : "LemonChiffon";

		return (
			<React.Fragment>
				<div className={`title ${active}`} onClick={() => this.onTitleClick(this.props.index)} style={{backgroundColor: `${yellow}`}}>
					<div className="icons" onClick={(e) => e.stopPropagation()}>
						<Link to={`/tasks/${task._id}/delete`} className="ui red button">
							<i className="trash icon" />
						</Link>
						{this.renderEditButton(task.editDisabled)}
					</div>
					<div className="date" onClick={(e) => e.stopPropagation()}>
						{this.renderDate(task)}
					</div>
					<Link to="#" onClick={(e) => e.stopPropagation()}>
						<CustomEditable
							text={task.title || "New Task"}
							editDisabled={task.editDisabled}
							onEditableSubmit={this.onEditableSubmit}
							type="title" />
					</Link>
				</div>
				<div className={`content ${active}`} style={{backgroundColor: `${yellow}`}}>
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
	return {selected: state.accordion};
};

export default connect(mapStateToProps, {updateTask, selectAccordion, deselectAccordion})(TaskItem);