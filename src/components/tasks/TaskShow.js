import React from "react";
import Reorder, {reorder, reorderFromTo} from 'react-reorder';
import {connect} from "react-redux";
import {fetchTask} from "../../actions";

class TaskShow extends React.Component {
	state = {list: [{name: "item1"}, {name: "item2"}, {name: "item3"}]}
	onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
	  this.setState({
	    list: reorder(this.state.list, previousIndex, nextIndex)
	  });
	}

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
		this.props.fetchTask(this.props.match.params.id);
	};

	renderListItem = () => {
		return <h1>Item</h1>
	}

	render() {
		if(!this.props.task) {
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
				<Reorder
				  reorderId="my-list"
				  component="ul"
				  lock="horizontal"
				  onReorder={this.onReorder}
				  placeholder={<div className="custom-placeholder" />}
				>
				  {
				    this.state.list.map((item) => (
				      <li key={item.name}>
				        {item.name}
				      </li>
				    ))
				  }
				</Reorder>
			</div>
		);
	};
};

const mapStateToProps = (state, ownProps) => {
	return {task: state.tasks[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchTask})(TaskShow);