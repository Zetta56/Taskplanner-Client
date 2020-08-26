import React from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
	render() {
		return (
			ReactDOM.createPortal(
				<div className="ui dimmer active" onClick={this.props.onDismiss}>
					<div className="ui modal active" onClick={(e) => e.stopPropagation()}>
						<div className="header" style={{backgroundColor: "#D7D7D7"}}>{this.props.header}</div>
						<div className="content" style={{fontSize: "17px", color: "rgba(0,0,0,.85)", backgroundColor: "#D7D7D7"}}>{this.props.content}</div>
						<div className="actions" style={{backgroundColor: "#D7D7D7"}}>{this.props.buttons}</div>
					</div>
				</div>,
				document.querySelector("#modal")
			)
		);
	}
};

export default Modal;