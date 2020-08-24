import React from "react";
import Reorder, {reorder, reorderFromTo} from "react-reorder";
import {connect} from "react-redux";
import {fetchTask, reorderSteps, fetchSteps, createStep} from "../../actions";
import StepItem from "../StepItem"

class TaskShow extends React.Component {
	state = {list: [{name: "item1"}, {name: "item2"}, {name: "item3"}]}
	// onReorder = (e, previousIndex, nextIndex) => {
	//   this.setState({
	//     list: reorder(this.state.list, previousIndex, nextIndex)
	//   });
	// }

	onReorder = (event, previousIndex, nextIndex) => {
		this.props.reorderSteps(this.props.steps, previousIndex, nextIndex);
	};

	// <Reorder
	//   reorderId="my-list" // Unique ID that is used internally to track this list (required)
	//   component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
	//   lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
	//   onReorder={this.onReorder} // Callback when an item is dropped (you will need this to update your state)
	//   placeholder={<div className="custom-placeholder" />}
	// >
	//   {
	//     this.state.list.map((item) => (
	//       <li key={item.name}>
	//         {item.name}
	//       </li>
	//     ))
	//   }
	// </Reorder>

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
		// return this.state.list.map(item => {
		// 	return <li key={item.name}>{item.name}</li>
		// })
	};

	render() {
		if(!this.props.task || !this.props.steps) {
			return null;
		};

		const task = this.props.task;
		
		return (
			<div className="ui items" id="taskShow">
				<div className="item">
					<div className="content">
						<h1 className="header">{task.title}</h1>
						<div className="meta">{task.description}</div>
					</div>
				</div>
				<button className="ui teal button" onClick={() => this.props.createStep({content: "New Step"}, task._id)}>Add New Step</button>
				<Reorder
					reorderId="stepList"
					lock="horizontal"
					onReorder={this.onReorder}
					placeholder={<div className="custom-placeholder" />}
				>
					{this.renderList()}
				</Reorder>
			</div>
		);
	};
};

const mapStateToProps = (state, ownProps) => {
	return {task: state.tasks[ownProps.match.params.id], steps: state.steps};
};

export default connect(mapStateToProps, {fetchTask, reorderSteps, fetchSteps, createStep})(TaskShow);