import { useSelector } from "react-redux";
import Card from "../card/card";
import "./usersdetailes.scss";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import firebase from "firebase";

let Userdeatailes = () => {
  let name = useSelector((state) => state.user?.name);
  let productsdetailed = useSelector((state) => state.productsdetailed);
  const userlength = useSelector((state) => state.user);
  console.log(userlength._id, "user iddd");
  const [show, setShow] = useState(false);
  const onClose = (id, buyer) => {
    setShow(false);
    if (buyer?.count > 0) {
      buyer.count -= 1;
    }
    buyer.read = false;
    firebase
      .database()
      .ref("productsdetailed/" + id + "/buy/")
      .set(buyer)
      .then(() => {
        alert("seller read your message");
      })
      .catch(() => {
        alert("something went wrong");
      });
  };
  let count = Object.values(productsdetailed)?.length
    ? Object.values(productsdetailed)
        ?.filter((item) => item?.userID === userlength?.uid && item?.buy?.read)
        ?.reduce((total, current) => (total += current?.buy?.count || 0), 0)
    : 0;
  console.log(count, "count batao bhau");
  return (
    <>
      <div className="name-button">
        <div>
          <button>{name}</button>
        </div>
        <div className="toast-user">
          <Row>
            {Object.entries(productsdetailed)
              ?.filter(
                (item) =>
                  item[1]?.userID === userlength?.uid && item[1]?.buy?.read
              )
              ?.map((item, index) => (
                <>
                  <Col xs={6}>
                    <Toast
                      onClose={() => onClose(item[0], item[1]?.buy)}
                      show={show}
                      delay={3000}
                    >
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded mr-2"
                          alt=""
                        />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                        Woohoo, you're reading this text in a Toast!
                      </Toast.Body>
                    </Toast>
                  </Col>
                </>
              ))}
            <Col className="notificatio" xs={6}>
              <div className="counter">{count} </div>
              <Button onClick={() => setShow(true)}>Notification </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="carddiv">
        {console.log(productsdetailed, userlength, " asgjk")}
        {Array.isArray(productsdetailed) && (productsdetailed)
          ?.filter((item) => item?.userID === userlength?._id)
          ?.map((item, index) => {
            console.log(item, "kiya mil raha hai");
            return (
              <Card
                item={item}
                id={item?._id}
                index={index}
                showCloseIcon
                buyer={item?.buy}
              />
            );
          })}
      </div>
    </>
  );
};

export default Userdeatailes;
