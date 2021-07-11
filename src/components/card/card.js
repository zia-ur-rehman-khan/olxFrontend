import { useDispatch, useSelector } from "react-redux";
import "./card.scss";
import image from "../../assets/images/cross.jpg";
// import {Toast} from 'react-bootstrap'
// import {Row} from 'react-bootstrap'
// import {Col} from 'react-bootstrap'
// import {Button} from 'react-bootstrap'
import firebase from "firebase";
import { useState } from "react";
import axios from "axios";
import appsetting from "../../appSetting/appsetting";
let Card = ({ item, id, showCloseIcon, buyer }) => {
  let products = useSelector((state) => state.productsdetailed);
  
  let dispatch = useDispatch();
  // console.log(buyer,"buy wala option")
  // let dispatch = useDispatch()

  // console.log(products,"all products")
  let deletedata = () => {
    axios
      .post(`${appsetting.serverBaseUrl}/add/delete-by-id`, { _id: id })
      .then((succ) => {
        console.log(succ.data.deleted);
        if (succ.data.status) {
          dispatch({
            type: "delete",
            payload: id,
          });
        }
      })
      .catch((err) => {
        if (err) {
          alert("unabel to delete data");
        }
      });
  };

  return (
    <>
      <div className="card">
        {showCloseIcon ? (
          <div className="imagesss">
            <img src={image} onClick={() => deletedata(id)} />
          </div>
        ) : (
          <></>
        )}
        <div className="imagess">
          <img src={item?.productImage[1]} />
        </div>
        <div className="price">
          <p>
            <b>{item.price}</b>
          </p>
        </div>
        <div className="discription">
          <span>{item.discription}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
