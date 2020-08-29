import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../../history";
import {deleteCompletedTasks} from "../../actions";
import Modal from "../Modal";

class TaskDelete extends React.Component {
	renderButtons = () => {
		return (
			<React.Fragment>
				<button className="ui primary button" onClick={() => this.props.deleteCompletedTasks()}>Confirm</button>
				<Link to="/tasks" className="ui button" style={{border: "1px solid gray"}}>Cancel</Link>
			</React.Fragment>
		);
	};

	render() {
		return (
			<Modal
				header="Confim Deletion"
				content="Are you sure you want to delete ALL of your completed tasks?"
				buttons={this.renderButtons()}
				onDismiss={() => history.push("/tasks")} />
		);
	}
};

export default connect(null, {deleteCompletedTasks})(TaskDelete);