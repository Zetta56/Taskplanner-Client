import React from "react";
import {connect} from "react-redux";
import sanitize from "sanitize-html-react";
import {createStep, updateStep, deleteStep} from "../actions";
import CustomEditable from "./CustomEditable"

class StepItem extends React.Component {
	onEditableSubmit = (e, type) => {
		let sanitizedText = sanitize(e.target.textContent);
		this.props.updateStep({[type]: sanitizedText}, this.props.task._id, this.props.step._id);
	}

	render() {
		const step = this.props.step;

		return (
			<div>
				<CustomEditable
					text={step.content}
					editDisabled={false}
					onEditableSubmit={this.onEditableSubmit}
					type="content" />
				<button className="ui tiny red button" onClick={() => this.props.deleteStep(this.props.task._id, step._id)}><i className="x icon"></i></button>
			</div>
		);
	};
};

export default connect(null, {createStep, updateStep, deleteStep})(StepItem);