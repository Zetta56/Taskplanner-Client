import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../../history";
import {fetchTask, deleteTask} from "../../actions";
import Modal from "../Modal";

class TaskDelete extends React.Component {
	componentDidMount() {
		this.props.fetchTask(this.props.match.params.id);
	};

	renderButtons = () => {
		return (
			<React.Fragment>
				<button className="ui primary button" onClick={() => this.props.deleteTask(this.props.match.params.id)}>Confirm</button>
				<Link to="/" className="ui button" style={{border: "1px solid gray"}}>Cancel</Link>
			</React.Fragment>
		);
	};

	render() {
		if(!this.props.task) {
			return null;
		};
		return (
			<Modal
				header="Confim Deletion"
				content={`Are you sure you want to delete '${this.props.task.title}'?`}
				buttons={this.renderButtons()}
				onDismiss={() => history.push("/")} />
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {task: state.tasks[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchTask, deleteTask})(TaskDelete);