import React, { useState } from 'react'
import HackathonView from "./HackathonView";
import "./HomePage.css";

const Hackathon = ({ item, hide, viewPage }) => {
	const [showViewModal, setShowViewModal] = useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		viewPage(item);
	}
	return (
		<div className="hackathon">
			<h1 className="">Manager {item.manager}</h1>
			<h1 className="">Created  On{item.created_on}</h1>
			<h1 className="">Name {item.name}</h1>
			<div className="create-div-modal">
				<button className="view-btn trigger-modal" onClick={()=> setShowViewModal(!showViewModal)}>View</button>
					{ showViewModal && <HackathonView /> }
			</div>
		</div>
		)
}


export default Hackathon