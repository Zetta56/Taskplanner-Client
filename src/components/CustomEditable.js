import React from "react";
import ContentEditable from "react-contenteditable";
import sanitize from "sanitize-html-react";

class CustomEditable extends React.Component {
	onEditableClick = (e) => {
		if(!this.props.editDisabled) {
			//Creates new set of document nodes
			const range = document.createRange();
			//Sets range to be at event target's text
			range.selectNodeContents(e.target);
			//Highlights specific range
			window.getSelection().addRange(range);
		}
	};

	onEditableKeydown = (e) => {
		//On highlight or when arrow keys/backspace pressed
		const deleting = [37, 39, 8].includes(e.which) || window.getSelection().toString() === e.target.textContent;

		//Submits when enter key pressed
		if(e.which === 13) {
			this.props.onEditableSubmit(sanitize(e.target.textContent), this.props.type);
		}

		//Sets max length for title
		if(e.target.textContent.length >= 50 && !deleting && this.props.type === "title") {
			e.preventDefault();
		};
	};

	render() {
		return (
			<ContentEditable
				html={this.props.text}
				disabled={this.props.editDisabled}
				onKeyDown={(e) => this.onEditableKeydown(e)}
				onClick={(e) => this.onEditableClick(e)}
				onBlur={(e) => this.props.onEditableSubmit(sanitize(e.target.textContent), this.props.type)} />
		);
	};
};

export default CustomEditable;