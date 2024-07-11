import React from 'react';
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
	return ( 
		<div className="nav-bar">
			<nav>
				<ul className="list">
					<div className="nav-bar-brand">Hackathoner</div>
					<li className="item"><Link to="/"><button className="item-button">Home</button></Link></li>
					<li className="item"><Link to="/login"><button className="item-button">Login</button></Link></li>
					<li className="item"><Link to="/sign-up"><button className="item-button">Sign Up</button></Link></li>
				</ul>
			</nav>
		</div>
	)
}

export default NavBar