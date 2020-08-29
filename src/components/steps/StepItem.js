import React from "react";
import {connect} from "react-redux";
import {updateStep, deleteStep} from "../../actions";
import CustomEditable from "../CustomEditable";

class StepItem extends React.Component {
	render() {
		const done = this.props.step.done ? "done" : "";

		return (
			<div className={`stepItem ${done}`}>
				<div className="ui checkbox">
					<input type="checkbox" onChange={() => this.props.updateStep({done: !this.props.step.done}, this.props.step._id, this.props.task._id)} />
					<label></label>
				</div>
				<div className={`content ${done}`}>
					<CustomEditable
						text={this.props.step.content || "New Step"}
						editDisabled={false}
						onEditableSubmit={(text, type) => this.props.updateStep({[type]: text}, this.props.step._id, this.props.task._id)}
						type="content" />
				</div>
				<button className="ui red button" onClick={() => this.props.deleteStep(this.props.step._id, this.props.task._id)}>
					<i className="x icon"></i>
				</button>
			</div>
		);
	};
};

export default connect(null, {updateStep, deleteStep})(StepItem);