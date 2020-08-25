import React from "react";
import {connect} from "react-redux";
import sanitize from "sanitize-html-react";
import {updateStep, deleteStep} from "../actions";
import CustomEditable from "./CustomEditable";

class StepItem extends React.Component {
	onEditableSubmit = (e, type) => {
		let sanitizedText = sanitize(e.target.textContent);
		this.props.updateStep({[type]: sanitizedText}, this.props.step._id, this.props.task._id);
	}

	render() {
		const step = this.props.step;

		return (
			<div className="stepItem">
				<CustomEditable
					text={step.content}
					editDisabled={false}
					onEditableSubmit={this.onEditableSubmit}
					type="content" />
				<button className="ui red button" onClick={() => this.props.deleteStep(step._id, this.props.task._id)}>
					<i className="x icon"></i>
				</button>
			</div>
		);
	};
};

export default connect(null, {updateStep, deleteStep})(StepItem);