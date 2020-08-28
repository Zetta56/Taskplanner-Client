import axios from "axios";

// withCredentials enables cookie requests and credentials allows cookie response from specified origin
export default axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
	withCredentials: true,
	credentials: "include"
});