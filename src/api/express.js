import axios from "axios";

//withCredentials enables cookie requests and credentials allows cookie response from specified origin
export default axios.create({
	baseURL: "http://localhost:3001",
	withCredentials: true,
	credentials: "include"
});