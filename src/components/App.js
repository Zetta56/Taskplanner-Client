import React from "react";
import {Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {resetError, login, logout} from "../actions";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Landing from "./Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList";
import TaskDelete from "./tasks/TaskDelete";
import TaskDeleteMany from "./tasks/TaskDeleteMany";
import TaskShow from "./tasks/TaskShow";
import StepDeleteMany from "./steps/StepDeleteMany";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		window.refreshCooldown = false;
		window.setInterval(() => window.refreshCooldown = false, 180000);
		
		//Loads auth2 client and checks login status
		window.gapi.load("client:auth2", () => {
			window.gapi.client.init({
				clientId: process.env.REACT_APP_GOOGLE_CLIENTID,
				scope: "email"
			}).then(() => loadAuth());
		});

		const loadAuth = async () => {
			await express.post("/refresh");
			const response = await express.get("/access");
			
			if(response.data) {
				this.props.login(response.data._id);
			} else if(window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
				this.props.login({googleId: window.gapi.auth2.getAuthInstance().currentUser.get().getId()});
			} else {
				this.props.logout("initial");
			};
		};
		
		//Removes error messages upon navigation
		history.listen(async (location) => {
			if(this.props.error) {
				this.props.resetError();
			};
		});
	};

	renderError() {
		if(this.props.error) {
			return <div className="ui negative message" id="errorMessage">{this.props.error}</div>
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
							<ProtectedRoute path="/" exact component={Landing}></ProtectedRoute>
							<ProtectedRoute path="/register" exact component={Register}></ProtectedRoute>
							<ProtectedRoute path="/login" exact component={Login}></ProtectedRoute>
							<ProtectedRoute path="/tasks" exact component={TaskList} authenticate></ProtectedRoute>
							<ProtectedRoute path="/tasks/completed/delete" exact component={TaskDeleteMany} authenticate></ProtectedRoute>
							<ProtectedRoute path="/tasks/:id/steps/delete" exact component={StepDeleteMany} authenticate></ProtectedRoute>
							<ProtectedRoute path="/tasks/:id/delete" exact component={TaskDelete} authenticate></ProtectedRoute>
							<ProtectedRoute path="/tasks/:id" exact component={TaskShow} authenticate></ProtectedRoute>
						</Switch>
					</div>
				</div>
			</Router>
		);
	};
};

const mapStateToProps = (state) => {
	return {error: state.error.message}
};

export default connect(mapStateToProps, {resetError, login, logout})(App);