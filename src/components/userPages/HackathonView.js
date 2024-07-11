import React, { useEffect, useState } from "react";
import { History, useHistory } from "react-router-dom";
import "./HackathonView.css";

const HackathonView = ()=>{
	const [hackathon, setHackathon] = useState("");
	const history = useHistory();
	// useEffect(()=>{
	// 	return fetchData();
	// },[])
	// const fetchData = ()=>{
	// 	const options = {
	// 		method: "POST",
	// 		headers: {
	// 			'Authorization' : 'Bearer' + token,
	// 		},
	// 		body : JSON.stringify(item)
	// 	}
	// 	fetch("/api/get-one-hackathon", options).then(res => {
	// 		if(res.status === 401){
	// 			history.push("/login");
	// 			return {};
	// 		}else{
	// 			return res.json();
	// 		}
	// 	}).then(data => {
	// 		setHackathon(data)
	// 	})
	// 	console.log(hackathon)
	// }
	return (
		<div className="HackathonView">
			<div className="content">
				<h1>This is the view page</h1>
				<h1>App</h1>
				<p>Brilliant app ideas only</p> 		
				<button className="join">Join</button>
				<button className="close">&times;</button>
			</div>
		</div>
	)
}

export default HackathonView;