import React from "react";
import {Router, Route} from "react-router-dom";
import "./App.css";
import history from "../history";
import Header from "./Header";
import Register from "./Register";
import TaskList from "./TaskList";

class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Header />
				<div className="ui container">
					<Route path="/" exact component={TaskList}></Route>
					<Route path="/register" exact component={Register}></Route>
				</div>
			</Router>
		);
	};
};

export default App;