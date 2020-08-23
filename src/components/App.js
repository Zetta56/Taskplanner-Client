import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {deleteAnonymousTasks, resetError, login, logout} from "../actions";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import TaskList from "./routes/TaskList";
import TaskCreateAlt from "./routes/TaskCreateAlt";
import TaskDelete from "./routes/TaskDelete";
import "./App.css";
//Will add react draggable
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
							<Route path="/tasks/create/confirm" exact component={TaskCreateAlt}></Route>
							<Route path="/tasks/:id/delete" exact component={TaskDelete}></Route>
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