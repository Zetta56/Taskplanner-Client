import React from "react";
import {connect} from "react-redux";
import ContentEditable from "react-contenteditable";
import sanitize from "sanitize-html-react";
import {updateTask} from "../actions";

class TaskEditable extends React.Component {
	onEditableClick = (e) => {
		//Creates new set of document nodes
		const range = document.createRange();
		//Sets range to be at event target's text
		range.selectNodeContents(e.target);
		//Highlights specific range
		window.getSelection().addRange(range);
	};

	onEditableKeydown = (e, taskId) => {
		const deleting = [37, 39, 8].includes(e.which) || window.getSelection().toString() === e.target.textContent;

		//Submits when enter key pressed
		if(e.which === 13 && this.props.type === "title") {
			this.onEditableSubmit(e, taskId);
		}

		//Stops string at specified max
		if(e.target.textContent.length >= 50 && !deleting && this.props.type === "title") {
			e.preventDefault();
		};
	};

	onEditableSubmit = (e, taskId) => {
		//Allows all tags and attributes in sanitize set
		let sanitizedText = sanitize(e.target.textContent, {
			allowedTags: false,
			allowedAttributes: false
		})
		this.props.updateTask({[this.props.type]: sanitizedText}, taskId);
	};

	render() {
		console.log(this.props.text)
		return (
			<ContentEditable
				html={this.props.text}
				disabled={this.props.task.editDisabled}
				onBlur={(e) => this.onEditableSubmit(e, this.props.task._id)}
				onKeyDown={(e) => this.onEditableKeydown(e, this.props.task._id)}
				onClick={(e) => this.onEditableClick(e)} />
		);
	};
};

export default connect(null, {updateTask})(TaskEditable);