//react and react dom related stuff
import React from 'react';
// my components
import Hackthon from "./Hackathon";
//my styles
import "./AllHackathons.css";

const AllHackathons = (props) => {
	return (
		<>
			<h1>All hackathons list</h1>
			<div className="all-hackathons">
				{ props.hackathons && props.hackathons.map((item, index)=>{
					return <Hackthon item = { item }  key ={ index } viewPage = {(item)=> props.viewPage(item) }  />
				}) }
			</div>
		</>
	)
}

export default AllHackathons