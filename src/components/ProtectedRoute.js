import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

class ProtectedRoute extends React.Component {
	render() {
		const redirectUrl = this.props.isLoggedIn ? "/tasks" : "/login",
			  //Converts this.props.authenticate from true/undefined to true/false
			  authenticate = this.props.authenticate ? true : false;
		
		if(this.props.isLoggedIn === null) {
			return null;
		} else if(authenticate === this.props.isLoggedIn) {
			return <Route path={this.props.path} component={this.props.component}></Route>
		} else {
			return <Redirect to={redirectUrl} />
		};
	};
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth.isLoggedIn};
};

export default connect(mapStateToProps)(ProtectedRoute);