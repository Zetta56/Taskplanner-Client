import React from "react";
import {Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import express from "../api/express";
import history from "../history";
import {resetError, login, logout} from "../actions";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import TaskList from "./TaskList";
import "./App.css";

class App extends React.Component {
	componentDidMount() {
		history.listen(async (location) => {
			this.props.resetError();
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
	
	render() {
		return (
			<Router history={history}>
				<Header />
				<div id="mainContainer">
					{this.props.error &&
						<div className="ui negative message" id="errorMessage">{this.props.error}</div>
					}
					<div className="ui container">
						<Route path="/" exact component={TaskList}></Route>
						<Route path="/register" exact component={Register}></Route>
						<Route path="/login" exact component={Login}></Route>
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