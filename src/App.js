import Signin from "./components/authentication/signin/signin";
import Signup from "./components/authentication/signup/signup";
import Olx from "./components/landing-page/olx";
import loader from "./assets/images/loader.webp";
import axios from "axios";
import appsetting from "./appSetting/appsetting";
import Buyerpagelist from "./components/buyerpagelist/buyerpagelist";
import Productsdetailed from "./components/Add-products/products-detailed";
import Main from "./components/mainpage/mainpage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { firebaseConfig } from "./firebase";
// import { Spinner } from "react-bootstrap";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Userdeatailes from "./components/userdetailes/userdetailes";
firebase.initializeApp(firebaseConfig);

let App = () => {
  const dispatch = useDispatch();
  const userlength = useSelector((state) => state.user);

  let user = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    console.log(userlength._id, "user idd ");
    if (user) {
      dispatch({
        type: "user",
        payload: user,
      });
    } else {
      dispatch({
        type: "user",
        payload: false,
      });
    }

    axios
      .get(`${appsetting.serverBaseUrl}/add/get-all-add`)
      .then((succes) => {
        // alert("data is here");
        console.log(succes.data.adds, "product's data is here");

        dispatch({
          type: "productsdetailed",
          payload: succes.data.adds,
        });
      })
      .catch((err) => {
        alert(err);
        console.log(err, "errorsss!!!!");
      });
  }, []);

  if (userlength === "loading")
    return (
      <div className="duck">
        <img src={loader} />
        {/* <Spinner animation="border" role="status"></Spinner> */}
      </div>
    );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            path="/"
            condition={!userlength?._id}
            SuccessComp={Olx}
            failPath={"/Olx"}
            exact
          />
          <Route path="/Olx" exact>
            <Olx />
          </Route>
          <PrivateRoute
            path={"/signin"}
            exact
            condition={!userlength?._id}
            SuccessComp={Signin}
            failPath={"/"}
          />
          <PrivateRoute
            path={"/signup"}
            exact
            condition={!userlength?._id}
            SuccessComp={Signup}
            failPath={"/"}
          />
          <PrivateRoute
            path={"/products-detailed"}
            condition={userlength?._id}
            SuccessComp={Productsdetailed}
            failPath={"/signin"}
          />
          <PrivateRoute
            path={"/buyerspage/:id"}
            condition={userlength?._id}
            SuccessComp={Buyerpagelist}
            failPath={"/signin"}
          />
          <PrivateRoute
            path={"/user-detailes"}
            condition={userlength?._id}
            SuccessComp={Userdeatailes}
            failPath={"/Olx"}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

let PrivateRoute = ({ condition, SuccessComp, failPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        condition ? <SuccessComp {...rest} /> : <Redirect to={failPath} />
      }
    />
  );
};

export default App;
