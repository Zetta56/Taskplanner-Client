import React from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import moment from "moment";
import {fetchTasks, selectAccordion, deselectAccordion} from "../../actions";

class TaskList extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	};

	onTitleClick = (index) => {
		if(this.props.selected.includes(index)) {
			this.props.deselectAccordion(index);
		} else {
			this.props.selectAccordion(index);
		};
	};

	renderList = () => {
		if(!this.props.tasks) {
			return null;
		};

		return this.props.tasks.map((task, index) => {
			const active = this.props.selected.includes(index) ? "active" : "";
			return (
				<React.Fragment key={task._id}>
					<div className={`title ${active}`} onClick={() => this.onTitleClick(index)}>
						<div className="icons" onClick={(e) => e.stopPropagation()}>
							<Link to={`/tasks/${task._id}/edit`} className="ui blue button">
								<i className="pencil icon" />
							</Link>
							<Link to={`/tasks/${task._id}/delete`} className="ui red button">
								<i className="trash icon" />
							</Link>
						</div>
						<span className="date">{moment(task.date).format("MMM DD, YYYY")}</span>
						<Link to="#" onClick={(e) => e.stopPropagation()}>{task.title}</Link>
					</div>
					<div className={`content ${active}`}>{task.description}</div>
				</React.Fragment>
			);
		});
	};

	render() {
		return (
			<div id="taskList">
				<Link to="/tasks/new" className="ui primary button"><i className="plus icon"></i>Create New Task</Link>
				<div className="ui styled accordion">
					{this.renderList()}
				</div>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {tasks: Object.values(state.tasks), selected: state.accordion};
};

export default connect(mapStateToProps, {fetchTasks, selectAccordion, deselectAccordion})(TaskList);