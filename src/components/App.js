import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {resetError, login, logout} from "../actions";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList";
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

		const initialAuth = async () => {
			await express.post("/refresh");
			const response = await express.get("/access");
			
			if(response.data) {
				this.props.login(response.data._id, "initial");
			} else {
				this.props.logout("initial");
			};
		};

		initialAuth();
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
							<ProtectedRoute path="/" exact component={TaskList}></ProtectedRoute>
							<ProtectedRoute path="/tasks/:id/delete" exact component={TaskDelete}></ProtectedRoute>
							<ProtectedRoute path="/tasks/:id" exact component={TaskShow}></ProtectedRoute>
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

export default connect(mapStateToProps, {resetError, login, logout})(App);