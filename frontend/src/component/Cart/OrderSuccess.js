import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {

  
  const history = useHistory();
  const dispatch = useDispatch();

  async function displayOrder() {
    const { data } = await axios.get("/api/v1/orders/me");
    //console.log(data.orders[data.orders.length-1]._id);
    var orderId = data.orders[data.orders.length-1]._id
    history.push(`/order/${orderId}`);       
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
      <Button onClick={displayOrder}>Display Order</Button>
      {/* <Link to=`/order/${productId}``>View Orders</Link> */}
    </div>
  );
};

export default OrderSuccess;
