import { NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import Buyerpage from "../buyerpage/buyerpage";



let Buyerpagelist = (props) => {
    let productsdetailed = useSelector((state) => state.productsdetailed);
    let CardUserId= props.computedMatch.params.id
    // console.log(CardUserId,"id of card")
    
    
  
return <>
  
{
 Array.isArray(productsdetailed) && (productsdetailed)?.filter( 
    (item )=> item._id === CardUserId).map(item =>{
    return <Buyerpage item={item} CardId={item._id} />}
  )
}
  
    
  
  
  </>;
};

export default Buyerpagelist;
