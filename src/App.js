import React,{ useState } from "react";
//form react and react related packages
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//my components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/userPages/HomePage";
import HackathonView from "./components/userPages/HackathonView";
//css
import './App.css';

function App() {
    let jwtToken = "";
    if(localStorage.getItem("token") !== null || localStorage.getItem("token") !== undefined){
        jwtToken = localStorage.getItem("token");
    }else{
        jwtToken = "";
    }
    const [token, setToken] = useState(jwtToken);
            
return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props)=>{
            return <HomePage {...props} token={token} />
          }}
        />
      </Switch>
      <Switch>
        <Route 
          exact 
          path="/sign-up" 
          render={(props) =>{
            return <SignUp {...props} setToken={setToken} /> 
          }}
        />

        <Route 
          exact 
          path="/login" 
          render={(props) =>{
            return <Login {...props} setToken={setToken} /> 
          }}
        />
        </Switch>
    </Router>
  );
}

export default App;
