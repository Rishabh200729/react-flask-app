// react related packages
import React,{useState } from 'react';
import { Link, useHistory } from "react-router-dom";
//css
import "./SignUp.css";
//my components
import Alert from "./Alert";

const Login = (props) => {
	// state 
	const [user, setUser] = useState({
		email : "",
		password : "",
	});
	const [errors, setErrors ] = useState("");
	const [isDisabled, setIsDisabled ] = useState(false);

	//for redirecting 
	let history = useHistory();

	const handleChange = (event) =>{
		const { name, value } = event.target;
		setUser(prevState => ({
			...prevState, [name] : value
		}));
	}
	const handleClick = (e) =>{
		e.preventDefault();
		setIsDisabled(true);
		fetch("/api/login", {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then((res)=> {
			if(res.ok){
				return res.json();
			}else{
				setErrors("Invalid credentials");
				return {};
			}
		})
		.then((data) =>{
			if(data.access_token){	
				console.log(data.access_token)
				localStorage.setItem("token",data.access_token);
		        props.setToken(data.access_token);
		        history.push("/");
			}
			else{
				setErrors("did not find any access token . check your credentials");
			}
		})
		setIsDisabled(false);
	}
	return (
		<div className="sign-up">
			<form className="sign-up-form" action="" method="post"> 
				<h1>Login Up</h1>
				<div className="item">
					<label htmlFor="email" className="email-label">Email</label>
					<input required type="email" id="username" name="email" value={user.email} onChange={handleChange} />
				</div>
				<div className="item">
					<label htmlFor="password">Password</label>
					<input required type="password" id="password" name="password" value={user.password} onChange={handleChange} />
					<br />
				</div>
				<div className="submit-btn">
					<button type="submit" onClick={handleClick} disabled={isDisabled} className="login-btn">Submit</button>
				</div>
				<div className="links">
					<br/><Link to="/sign-up">Dont have a account</Link>
					<br/><Link to="/"><button className="back-btn">Back</button></Link>
				</div>
				{ errors.length > 0  && <Alert msg={errors} category="error" />}
			</form>
		</div>
	)
}

export default Login
