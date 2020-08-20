import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {resetError, login, logout} from "../actions";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import TaskList from "./routes/TaskList";
import TaskCreate from "./routes/TaskCreate";
import TaskEdit from "./routes/TaskEdit";
import TaskDelete from "./routes/TaskDelete";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		history.listen(async (location) => {
			if(this.props.error) {
				this.props.resetError();
			};
			await express.post("/refresh");
		});

		const isLoggedIn = async () => {
			await express.post("/refresh");
			const response = await express.post("/access");
			
			if(response.data) {
				this.props.login(response.data._id);
			} else {
				this.props.logout();
			};
		};
		isLoggedIn()
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
							<Route path="/tasks/new" exact component={TaskCreate}></Route>
							<Route path="/tasks/:id/edit" exact component={TaskEdit}></Route>
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

export default connect(mapStateToProps, {resetError, login, logout})(App);