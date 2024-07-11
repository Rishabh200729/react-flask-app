//from react and react dom 
import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
//my components
import Alert from "../Alert";
import AllHackathons from "./AllHackathons";
import HackathonForm from "./HackathonForm";
import NavBar from "../NavBar";
//styles
import "./HomePage.css";

const HomePage = (props) => {
	const [ newHackathon, setNewHackathon ] = useState(null);
	const [hackathons, setHackathons] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loginMsg, setLoginMsg] = useState("Logged in successfully");
	const [query, setQuery] = useState("");
	const [errors, setErrors] = useState(null);

	let history = useHistory();
	
    useEffect(()=>{
    	fetchData();
	},[])

	const fetchData = ()=>{
		const options = {
			method: "GET",
			headers: {
				'Authorization' : 'Bearer' + props.token,
			},
		}
		fetch("/api/get-all-hackathons", options)
			.then(res => {
				if(res.status === 401){
					history.push("/login");
					return {};
				}else{
					return res.json();
				}
			})
			.then(data => {
				try{
					data.forEach(item =>{
						console.table(item);
						setHackathons(prevState => [... prevState ,item ]);
					})
				}catch(error){
					console.log(error)
				}
			})
	}
	//this function checks whether the database is changed , if it is then updates the hackathons array. 
	// so it is realtime instead of runtime :) lets gooo 

	let filteredHackathons = hackathons.filter((hackathon) =>{
		//check if hackathon name consists of query
		return hackathon.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || hackathon.manager.toLowerCase().indexOf(query.toLowerCase()) !== -1  
	});
    	
    const viewPage = (hackathon)=>{
    	history.push("/view")
    	console.log(hackathon);
    	props.setClickedHacathon(hackathon)
    }
	setInterval(()=>{
		setLoginMsg(null);
		return clearInterval();
	},10000)

	return (
		<>
			<NavBar />	
            { loginMsg !== null && <Alert msg={ loginMsg } category="success" /> } 
            { errors !== null && <Alert category= "error" msg={ errors } /> }
			<div className="HomePage">
				<div className="search">
				 	<input type="text" placeholder="Search for a hackathon" value={ query } onChange={(e) => setQuery(e.target.value) } />
				</div>
				<div className="hackathons-list">
					<AllHackathons hackathons= { filteredHackathons } viewPage = { viewPage }  />
				</div>
				<div className="create-div-modal">
					<button className="trigger-modal" onClick={()=> setShowModal(!showModal)}>Create a NEW Hackathon</button>
					{ showModal && <HackathonForm 
						token= { props.token }
						setShowModal = { setShowModal }
						showModal={ showModal }
						setErrors = {setErrors}
						hackathons = { hackathons }
						setHackathons = { setHackathons }
						setNewHackathon = { setNewHackathon }
					/> }
				</div>
	        </div>
        </>
	)
}

export default HomePage