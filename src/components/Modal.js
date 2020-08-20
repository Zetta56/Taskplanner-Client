import React from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
	render() {
		return (
			ReactDOM.createPortal(
				<div className="ui dimmer active" onClick={this.props.onDismiss}>
					<div className="ui modal active" onClick={(e) => e.stopPropagation()}>
						<div className="header">{this.props.header}</div>
						<div className="content">{this.props.content}</div>
						<div className="actions">{this.props.buttons}</div>
					</div>
				</div>,
				document.querySelector("#modal")
			)
		);
	}
};

export default Modal;