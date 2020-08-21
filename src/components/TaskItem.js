import React from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import ContentEditable from "react-contenteditable";
import DatePicker from "react-datepicker";
import moment from "moment";
import sanitize from "sanitize-html-react";
import {updateTask, selectAccordion, deselectAccordion} from "../actions";
import "react-datepicker/dist/react-datepicker.css";

class TaskItem extends React.Component {
	 state = {
	    startDate: new Date()
	  };
	 
	  handleChange = date => {
	    this.setState({
	      startDate: date
	    });
	  };

	onTitleClick = (index) => {
		if(this.props.selected.includes(index)) {
			this.props.deselectAccordion(index);
		} else {
			this.props.selectAccordion(index);
		};
	};

	onEditableKeydown = (e, taskId, type) => {
		const deleting = [37, 39, 8].includes(e.which) || window.getSelection().toString() === e.target.textContent;

		if(e.which === 13) {
			this.onEditableSubmit(e, taskId, type);
		}

		if(e.target.textContent.length >= 50 && !deleting) {
			e.preventDefault();
		};
	};

	onEditableSubmit = (e, taskId, type) => {
		let sanitizedText = sanitize(e.target.textContent)

		if(type === "title") {
			let shortenedText = sanitizedText.substring(0, 60)
			this.props.updateTask({title: shortenedText}, taskId);
		} else {
			this.props.updateTask({description: sanitizedText}, taskId);
		};
	};

	onEditableClick = (e) => {
		const range = document.createRange();	//Creates new set of document nodes
		range.selectNodeContents(e.target);		//Sets range to be at event target's text
		window.getSelection().addRange(range);		//Highlights specific range
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

	renderDate = (task) => {
		if(task.editDisabled) {
			return <span>{moment(task.date).format("MMM DD, YYYY")}</span>
		} else {
			//Note: Datepicker only accepts Date object, not ISO Date string
			return <DatePicker selected={moment(task.date)._d} onChange={(date) => this.props.updateTask({date: date}, task._id)} />
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
						<ContentEditable
							html={task.title || "New Task"}
							disabled={task.editDisabled}
							onBlur={(e) => this.onEditableSubmit(e, task._id, "title")}
							onKeyDown={(e) => this.onEditableKeydown(e, task._id, "title")}
							onClick={(e) => this.onEditableClick(e)}
							className="name" />
					</Link>
				</div>
				<div className={`content ${active}`} style={{backgroundColor: `${yellow}`}}>
					<ContentEditable
							html={task.description || "Enter a description here..."}
							disabled={task.editDisabled}
							onBlur={(e) => this.onEditableSubmit(e, task._id)}
							onKeyDown={(e) => this.onEditableKeydown(e, task._id)}
							onClick={(e) => this.onEditableClick(e)} />
				</div>
			</React.Fragment>
		);
	};
};

const mapStateToProps = (state) => {
	return {selected: state.accordion};
};

export default connect(mapStateToProps, {updateTask, selectAccordion, deselectAccordion})(TaskItem);