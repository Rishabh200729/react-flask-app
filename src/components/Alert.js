import React,{ useState }from 'react';

const Alert = ({category, msg}) => {

	const [ showAlert, setShowAlert ] = useState(true);
	const [bgColor, setBgColor] = useState(category === "success" ? "#90EE90" : "#FFCCCB");

	const errorStyles = {
		"margin":"auto",
		"backgroundColor":"	#FFCCCB",
		"width":"75%",
		"padding":"10px",
		"fontSize":"23px",
		"textAlign":"center",
		"borderRadius":"5px",
	}
	const succesStyles = {
		"margin":"10px auto",
		"backgroundColor":"	#90EE90",
		"width":"75%",
		"padding":"10px",
		"fontSize":"23px",
		"textAlign":"center",
		"borderRadius":"5px",
	}

	const close = {
		"cursor":"pointer",
		"padding": "0 20px",
		"fontSize":"27px",
		"fontWeight ":"600",
		"textAlign":"center",
		"borderRadius":"5px",
		"border":"none",
		"backgroundColor": bgColor,
		"float":"right"
	}
	return (
		<div className="alert">
			{ showAlert &&
				<p style={category === "error" ? errorStyles : succesStyles } category={category}>
					{ msg }
					<button className="close" style={ close } onClick={() => setShowAlert(!showAlert)}>&times;</button> 
				</p>
			}
		</div>
	)
}

export default Alert