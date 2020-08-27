import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {deleteAnonymousTasks, resetError, login, logout} from "../actions";
import Header from "./Header";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList";
import TaskCreateAlt from "./tasks/TaskCreate";
import TaskDelete from "./tasks/TaskDelete";
import TaskShow from "./tasks/TaskShow";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		history.listen(async (location) => {
			await express.post("/refresh");

			if(this.props.error) {
				this.props.resetError();
			};
		});

		(async () => {
			await express.post("/refresh");
			const response = await express.get("/access");
			
			if(response.data) {
				this.props.login(response.data._id, "initial");
			} else {
				this.props.logout("initial");
			};
		})();

		//Calls componentCleanup when app is completely removed from DOM
		window.addEventListener("unload", this.componentCleanup);
	};

	componentWillUnmount() {
		window.removeEventListener("unload", this.componentCleanup);
	};

	componentCleanup = () => {
		//Sends async request when available, even after redirect
		navigator.sendBeacon(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/tasks/anonymous`);
	};

	renderError() {
		if(this.props.error) {
			return (
				<div className="ui negative message" id="errorMessage">{this.props.error}</div>
			);
		};
	};
	
	render() {
		return (
			<Router history={history}>
				<Header />
				<div id="mainContainer">
					{this.renderError()}
					<div className="ui container">
						<Switch>
							<Route path="/" exact component={TaskList}></Route>
							<Route path="/tasks/create" exact component={TaskCreateAlt}></Route>
							<Route path="/tasks/:id/delete" exact component={TaskDelete}></Route>
							<Route path="/tasks/:id" exact component={TaskShow}></Route>
							<Route path="/register" exact component={Register}></Route>
							<Route path="/login" exact component={Login}></Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	};
};

const mapStateToProps = (state) => {
	return {error: state.error.message}
}

export default connect(mapStateToProps, {deleteAnonymousTasks, resetError, login, logout})(App);