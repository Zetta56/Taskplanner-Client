import React from "react";
import Reorder from "react-reorder";
import {connect} from "react-redux";
import {fetchTask, reorderSteps, fetchSteps, createStep} from "../../actions";
import StepItem from "../StepItem";
import "./TaskShow.css";

class TaskShow extends React.Component {
	onReorder = (event, previousIndex, nextIndex) => {
		this.props.reorderSteps(this.props.steps, previousIndex, nextIndex, this.props.task._id);
	};

	componentDidMount() {
		const fetchResources = async () => {
			await this.props.fetchTask(this.props.match.params.id);
			await this.props.fetchSteps(this.props.match.params.id);
		};

		fetchResources();
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

		const task = this.props.task;
		
		return (
			<div id="taskShow">
				<div className="info">
					<h1 className="title">{task.title}</h1>
					<div className="description">{task.description}</div>
				</div>
				<div className="steps">
					<button className="ui large blue button" onClick={() => this.props.createStep({content: "New Step"}, task._id)}>Add New Step</button>
					<Reorder
						reorderId="stepList"
						draggedClassName="dragged"
						placeholderClassName="placeholder"
						lock="horizontal"
						holdTime={75}
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