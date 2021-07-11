import Card  from "../card/card";
import { useSelector } from "react-redux";
import "./cardlist.scss";
import { Link } from "react-router-dom";

let Cardlist = () => {
  let productsdetailed = useSelector((state) => state.productsdetailed);
  let search = useSelector(state => state.search)
  
  return (
    <>
      <div className="carddiv">
        
        { typeof productsdetailed === "object" && (productsdetailed).filter(
          item =>item.category?.includes(search) || item.discription?.includes(search)
        ).map((item, index) =>
{  
  // console.log(item[0] ,"date. now wali id")
  return (
  <Link to={"/buyerspage/"+item?._id}> <Card item={item} id={item?._id} index={index} /></Link>)
         
  })}
      </div>
    </>
  );
};

export default Cardlist;
