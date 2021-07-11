import "./style.scss";
import users from "../../../assets/images/user.png";
import back from "../../../assets/images/back.png";
import lock from "../../../assets/images/padlock.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import appsetting from "../../../appSetting/appsetting";
import axios from "axios";

let Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  let createuser = (event) => {
    event.preventDefault();

    let usersdetailes = {
      name: username,
      email: email,
      password: password,
    };
    axios
      .post(`${appsetting.serverBaseUrl}/users/signup`, usersdetailes)
      .then((succes) => {
        // console.log(succes.data.user);
        if(succes.data.status){
        localStorage.setItem('users', JSON.stringify(succes.data.user));
        
        dispatch({
          type: "user",
          payload: succes.data.user,
        })}
        if(!succes.data.status){
          seterror(succes.data.status.errMessage)
        } 
      })
    
      .catch((err) => {
        seterror(err)
        console.log(err);
      });
  };

  return (
    <>
      <div className="pic">
        <div class="login-box">
          <h1>Signup</h1>
          
          <form onSubmit={createuser}>
          <div class="textbox">
            <img className="img" src={users} />
            <input
              type="text"
              required
              value={username}
              placeholder="User Name"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div class="textbox">
            <img className="img" src={users} />
            <input
              type="email"
              required 
              value={email}
              placeholder="User Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div class="textbox">
            <img className="img" src={lock} />
            <input
              type="password"
              required 
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input id="btn" type="submit"  value="Sign up " />
          </form>
          <div>



          
           <p>
              <em>
                {" "}
                you have no account plz{" "}
                <Link to="/signin">
                  <b>signin</b>
                </Link>{" "}
              </em>
            </p>
            <br />

            <Link to="/">
              <img src={back}></img>
              <b>Go to mainpage</b>
            </Link>
            <br />
          </div>
          <div className="error">
            <em>{error}</em>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
