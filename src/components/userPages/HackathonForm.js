import React,{ useState, useEffect } from 'react';
// my compoenents
//import styles
import "./HackathonForm.css";

const HackathonForm = (props) => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");

	const handleSubmit = (e) =>{
		e.preventDefault();
		fetch("/api/create-hackathon",{
			method:"POST",
			headers: {
				"Content-Type" : "application/json",
				"Authorization" : "Bearer" + props.token,
		},
		body:JSON.stringify({ name, desc })
		}).then(res =>{
			if (res.ok){
				return res.json();
			}else{
				if(res.status === 403){
					props.setErrors("sorry you are not a manager") //403(forbidden) the user is a manager
					return {}
				}
			}
		}).then(data =>{
			props.setHackathons(prevState =>{
				return [...prevState,data]
			})
		})
		setName("");
		setDesc("");
		props.setShowModal(!props.showModal);
	}

	return (
		<div className="hackathon-form">
			<form action="" method="POST" onSubmit={ handleSubmit } className="hackathon-form-content" >
				<h1>Create a new Hackathon</h1>
				<input type="text" placeholder="Hackathon Event Name" value={ name } onChange={(e) => setName(e.target.value)} />
				<br />
				<textarea cols="100" rows="6" type="text" placeholder="description" value={ desc } onChange={(e) => setDesc(e.target.value)} />
				<br />
				<button className="submit">Create</button>
				<button onClick={()=> props.setShowModal(!props.showModal)} className="close-btn">&times;</button>
			</form>
		</div>
	)
}


export default HackathonForm