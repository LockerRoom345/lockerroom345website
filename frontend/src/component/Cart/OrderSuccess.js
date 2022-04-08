import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const OrderSuccess = () => {

  
  const history = useHistory();
  

  async function displayOrder() {
    history.push(`/orders`);       
  }
  const { cartItems } = useSelector((state) => state.cart);

  const { orders } = useSelector((state) => state.allOrders);

  console.log(orders);


  console.log("change done");
  cartItems.length =0;
  console.log("change successful");

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Button onClick={displayOrder}>Display All Orders</Button>
      {/* <Link to=`/order/${productId}``>View Orders</Link> */}
    </div>
  );
};

export default OrderSuccess;
