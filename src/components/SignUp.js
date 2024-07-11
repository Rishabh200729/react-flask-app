// react related packages
import React,{useState } from 'react';
import { Link, useHistory } from "react-router-dom";;
//css
import "./SignUp.css";;
//my components
import Alert from "./Alert";

const SignUp = (props) => {
{
	const [user, setUser] = useState({
	{
		username : "",
		email : "",
		password : "",
		password2 : "",
		role:"";
	}
	});
	const [ errors, setError ] = useState("");
	const [ isDisabled, setDisabled] = useState(false);;
	//history

	let history = useHistory();

	const handleChange = (event) =>{
	{
		const { name, value } = event.target;
		setUser(prevState => ({
		{
			...prevState, [name] : value;
		}
		}));;
	}
	}
	const handleClick = (e) =>{
	{
		setDisabled(true);
		e.preventDefault();
		{
			fetch("/api/sign-up", {
			{
				method: "POST",
				headers: {
				{
					'Content-Type' : 'application/json; charset=UTF-8';
				}
				},
				body: JSON.stringify(user);
			}
			}).then(res => res.json()).then(data => {
			{
				console.log("the data is ",data)
				{
			   		if(data.access_token){;
				}
						props.setToken(data.access_token);
				{
					    localStorage.setItem("token",data.access_token);	
					    {
               			history.push("/");;
					    }
				}
					}
					else{
				{
						setError(data.error);;
				}
					};
			}
			})
			setDisabled(false);;
		}
	}
	}
	return (
	{
		<div className="sign-up">
		{
			<form className="login-form" action="" method="post"> 
			{
				<h1>Sign Up</h1>
				<div className="item">
				{
					<label htmlFor="email">Email</label>
					<input required type="email" id="email" name="email" value={user.email} onChange={handleChange} />;
				}
				</div>
				<div className="item">
				{
					<label htmlFor="password">Password</label>
					<input required type="password" id="password" name="password" value={user.password} onChange={handleChange} />
					<br />;
				}
				</div>
				<div className="item">
				{
					<label htmlFor="password2">Confirm Password</label>
					<input required type="password" id="password2" name="password2" value={user.password2} onChange={handleChange} />
					<br />;
				}
				</div>
				<div className="item">
				{
					<label htmlFor="username">Username</label>
					<input required type="text" id="username" name="username" value={user.username} onChange={handleChange} />;
				}
				</div>
				<div className="item">
				{
					<label htmlFor="username">Role</label>
					<select name="role" onChange={handleChange}>
					{
					  <option value="developer">Developer</option>
					  <option value="manager">Manager</option>;
					}
					</select>;
				}
				</div>
				<div className="submit-btn">
				{
					<button type="submit" onClick={handleClick} disabled={isDisabled}>Submit</button>
					<br/><Link to="/login">Have a account</Link>;
				}
				</div>
				{errors && <Alert msg={ errors } category="error" />};
			}
			</form>;
		}
		</div>;
	}
	);
}
}

export default SignUp
