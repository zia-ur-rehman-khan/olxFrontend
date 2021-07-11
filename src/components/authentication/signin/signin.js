import {Link} from "react-router-dom"
import "./style.scss";
import {useState} from "react"
import user from "../../../assets/images/user.png"
import back from "../../../assets/images/back.png"
import lock from "../../../assets/images/padlock.png"
import firebase from "firebase"
import axios from "axios";
import appsetting from "../../../appSetting/appsetting";
import { useDispatch } from "react-redux";

let Signin = () =>{
  let dispatch = useDispatch()

const [email,setemail] = useState('')
const [password,setpassword]=useState('')
const [error,seterror]=useState('')

let createuser = (event)=>{
    event.preventDefault();

    console.log(email,"email")
    console.log(password,"password")

let usersdetailes = {
  email:email,
  password:password
} 

    axios
    .post(`${appsetting.serverBaseUrl}/users/signin`, usersdetailes)
    .then((succes) => {
      console.log(succes.data,"data ayega bhai")
      if(succes.data.status){
        localStorage.setItem('users', JSON.stringify(succes.data.user));
        dispatch({
          type: "user",
          payload: succes.data.user,
        })
      }
      if(!succes.data.status ){

        seterror(succes.data.errMessage)

      }
      })

    .catch((err) => {
      seterror(err)
      console.log(err);
    });






}








return<>
<div className="pic">
<div class="login-box">
<h1>login</h1>
<div class="textbox">
<img className="img" src={user} />
<input type="text" placeholder="Username" onChange={(e)=>setemail(e.target.value)} value={email}/>
</div>
<div class="textbox">
<img className="img" src={lock} />
<input type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
</div>
<input id="btn" type="button" onClick={createuser} value="Sign in "/>
<div>
    <p><em> you have no account plz <Link to="/signup"><b>signup</b></Link> </em></p><br/>
    
    <Link to="/"><img src={back}></img><b> Go to mainpage </b></Link>
</div>
<div className="error">
<em>{error}</em>
</div>
</div>
</div>
</>
}

export default Signin