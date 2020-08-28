import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

class ProtectedRoute extends React.Component {
	render() {
		switch(this.props.isLoggedIn) {
			case null:
				return null;
			case true:
				return <Route path={this.props.path} exact={this.props.exact} component={this.props.component}></Route>
			default:
				return <Redirect to="/login" />
		};
	};
};

const mapStateToProps = (state) => {
	return {isLoggedIn: state.auth.isLoggedIn}
};

export default connect(mapStateToProps)(ProtectedRoute);