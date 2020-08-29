import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../../history";
import {deleteSteps} from "../../actions";
import Modal from "../Modal";

class TaskDelete extends React.Component {
	renderButtons = () => {
		return (
			<React.Fragment>
				<button className="ui primary button" onClick={() => this.props.deleteSteps(this.props.match.params.id)}>Confirm</button>
				<Link to={`/tasks/${this.props.match.params.id}`} className="ui button" style={{border: "1px solid gray"}}>Cancel</Link>
			</React.Fragment>
		);
	};

	render() {
		return (
			<Modal
				header="Confim Deletion"
				content="Are you sure you want to delete ALL of your steps for this task?"
				buttons={this.renderButtons()}
				onDismiss={() => history.push(`/tasks/${this.props.match.params.id}`)} />
		);
	}
};

export default connect(null, {deleteSteps})(TaskDelete);