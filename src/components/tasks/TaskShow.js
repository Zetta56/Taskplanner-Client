import React from "react";
import Reorder from "react-reorder";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchTask, reorderSteps, fetchSteps, createStep} from "../../actions";
import CustomEditable from "../CustomEditable";
import StepItem from "../steps/StepItem";
import "./TaskShow.css";

class TaskShow extends React.Component {
	componentDidMount() {
		const fetchResources = async () => {
			await this.props.fetchTask(this.props.match.params.id);
			await this.props.fetchSteps(this.props.match.params.id);
		};

		fetchResources();
	};

	onReorder = (e, previousIndex, nextIndex) => {
		this.props.reorderSteps(this.props.steps, previousIndex, nextIndex, this.props.task._id);
	};

	renderReset = () => {
		if(this.props.steps.length !== 0) {
			return <Link to={`/tasks/${this.props.task._id}/steps/delete`} className="ui large right floated red button">Reset</Link>
		};
	};

	renderList = () => {
		return this.props.steps.map((step) => {
			return (
				<div key={step._id}>
					<StepItem step={step} task={this.props.task} />
				</div>
			);
		});
	};

	render() {
		if(!this.props.task || !this.props.steps) {
			return null;
		};
		
		return (
			<div id="taskShow">
				<div className="info">
					<CustomEditable className="title" text={this.props.task.title} editDisabled={true} />
					<CustomEditable className="description" text={this.props.task.description} editDisabled={true} />
				</div>
				<div className="steps">
					<button className="ui large blue button" onClick={() => this.props.createStep({content: "New Step"}, this.props.task._id)}>
						Add New Step
					</button>
					{this.renderReset()}
					<Reorder
						reorderId="stepList"
						draggedClassName="dragged"
						placeholderClassName="placeholder"
						lock="horizontal"
						holdTime={100}
						onReorder={this.onReorder}
					>
						{this.renderList()}
					</Reorder>
				</div>
			</div>
		);
	};
};

const mapStateToProps = (state, ownProps) => {
	return {task: state.tasks[ownProps.match.params.id], steps: state.steps};
};

export default connect(mapStateToProps, {fetchTask, reorderSteps, fetchSteps, createStep})(TaskShow);