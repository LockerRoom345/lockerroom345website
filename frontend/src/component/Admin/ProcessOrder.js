import React, { Fragment, useEffect, useState, useRef } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import Select from "react-select";
import { TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { submitHandler } from "../Cart/Payment";
import moment from "moment";
import { integer } from "sharp/lib/is";

let deltaList = Array(100).fill(0);
let realval = integer
const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error3, updateError, isUpdated } = useSelector(
    (state) => state.order
  );
  const { error2, products } = useSelector((state) => state.products);
  // console.log("hehe",state.products);
  const [dummyRefresher, setdummyRefresher] = useState("");
  // console.log(deltaList);
  const increaseQuantity = (idx) => {
    // console.log("add", order.orderItems[idx].quantity);
    if (order.orderItems[idx].quantity < 5) {
      order.orderItems[idx].quantity += 1;
      realval=deltaList[idx] - order.orderItems[idx].quantity;
      realval += 1;
      // console.log(
      //   "increased",
      //   order.orderItems[idx].quantity,
      //   deltaList[idx],
      //   idx
      // );
      setdummyRefresher("refresh" + order.orderItems[idx].quantity);
    } else return;
  };

  const decreaseQuantity = (idx) => {
    // console.log("sub", order.orderItems[idx].quantity);
    if (order.orderItems[idx].quantity > 0) {
      order.orderItems[idx].quantity -= 1;
      realval=deltaList[idx] - order.orderItems[idx].quantity;
      realval -= 1;
      // console.log(
      //   "decreased",
      //   order.orderItems[idx].quantity,
      //   deltaList[idx],
      //   idx
      // );
      setdummyRefresher("refresh" + order.orderItems[idx].quantity);
    } else return;
  };
  function findOtherorderQuantity(itemName, subCategory, size) {
    let sum = 0;
    order.orderItems.map((product) => {
      console.log(product);
      if (
        product.name == itemName &&
        product.subCategory == subCategory &&
        product.ProductSize == size
      ) {
        sum += product.quantity;
      }
    });
    return sum;
  }
  function findInventory(itemName, subCategory, size, idx) {
    // console.log("inventoryyyyy");
    // console.log(itemName, subCategory,size[0]);
    let stockIndex = 0,
      stock = 0;
    const index = products.findIndex(
      (item) => item.name === itemName && item.SubCategory === subCategory
    );
    if (index >= 0) {
      stockIndex = products[index].ProductSize.findIndex(
        (item) => item.size === size[0]
      );
    }
    if (stockIndex >= 0) {
      stock = products[index]?.ProductSize[stockIndex].stock;
    }
    if (stockIndex >= 0 && index >= 0) {
      // console.log(stock, deltaList[idx], idx);
      return (
        <div>
          {stock - deltaList[idx] - order.orderItems[idx].quantity}
          {deltaList[idx] < 0 && <ArrowUpwardIcon />}
          {deltaList[idx] > 0 && <ArrowDownwardIcon />}
        </div>
      );
    } else {
      return -1;
    }
  }

  const { shippingInfo } = useSelector((state) => state.cart);
  const [status, setStatus] = useState("null");
  const componentRef = useRef();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);
    let temp = [];
    for (let i = 0; i < order.orderItems.length; i++) {
      temp.push(order.orderItems[i].quantity);
    }
    // console.log(temp);
    myForm.set("newQuantity", temp);
    //console.log("select status",status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    ////console.log(order);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    //console.log("before dispatch");
    //console.log("select status",status)
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: "grid",
              }}
            >
              <div ref={componentRef}>
                <div className="confirmshippingArea" >
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Order Placed by:</p>
                      <span>{order.user && order.user.name}</span>
                      {/* <hr></hr> */}
                      <span>&nbsp;</span>
                      <p>Teacher's Name:</p>
                      <span>
                        {order.user &&
                          order.shippingInfo.userLoggedInDesignation}
                      </span>
                    </div>
                    <div>
                      <p>Deliver To Student ID:</p>
                      <span>
                        {order.user &&
                          order.shippingInfo.receivingPersonName.split("_")[0]}
                      </span>
                    </div>
                    <div>
                      <p>Student Age:</p>
                      <span>
                        {order.user &&
                          order.shippingInfo.receivingPersonName.split("_")[1]}
                      </span>
                    </div>
                    <div>
                      <p>Student Gender:</p>
                      <span>
                        {order.user &&
                          order.shippingInfo.receivingPersonName.split("_")[2]}
                      </span>
                    </div>
                    <div>
                      <p>Order Date:</p>
                      <span>
                        {order.user &&
                          moment(order.shippingInfo.orderDate).format(
                            "MM-DD-YYYY hh:mm a"
                          )}
                      </span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.Email}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          order.shippingInfo.userAddress.split("|")[0]}
                      </span>
                    </div>
                    <div>
                      <p>District:</p>
                      <span>
                        {order.shippingInfo &&
                          order.shippingInfo.userAddress.split("|").length ==
                            2 &&
                          order.shippingInfo.userAddress.split("|")[1]}
                        {order.shippingInfo &&
                          order.shippingInfo.userAddress.split("|").length ==
                            1 &&
                          "-"}
                      </span>
                    </div>
                    <div>
                      <p>Additional Comments:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.additionalComments}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox" >
                    <div classaName="statusWrapper">
                      <div
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : order.orderStatus &&
                              order.orderStatus === "Ready for Pickup"
                            ? "BlueColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems" style={{ maxHeight: '100%'}} >
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer" style={{ overflowY: 'visible', maxHeight: '100%'}} >
                    <div className="cartitemHeader" >
                      <div className="cartitemholderimage">
                        <span>Image</span>
                      </div>
                      <div className="cartitemholdername">
                        <span>Name</span>
                      </div>
                      <div className="cartitemholdercat">
                        <span>Subcategory</span>
                      </div>
                      <div className="cartitemholdersize">
                        <span>Size</span>
                      </div>
                      <div className="cartitemholderquantity">
                        <span>Quantity</span>
                      </div>
                      <div className="cartitemholderquantity">
                        <span>Inventory</span>
                      </div>
                      {/* <div className="cartitemholderquantity">
                        <span>Other orders</span>
                      </div> */}
                    </div>

                    {order.orderItems &&
                      order.orderItems.map((item, idx) => (
                        <div className="cartitemholder" key={item.product}>
                          <div className="cartitemholderimage">
                            <img src={item.image} alt="Product" />
                          </div>
                          <div className="cartitemholdername">
                            <span>{item.name}</span>
                          </div>
                          <div className="cartitemholdercat">
                            <span>{item.SubCategory}</span>
                          </div>
                          <div className="cartitemholdersize">
                            <span>{item.ProductSize.split(",", 1)}</span>
                          </div>
                          <div className="cartitemholderquantity">
                            {order.orderStatus == "Processing" && (
                              <button onClick={() => decreaseQuantity(idx)}>
                                -
                              </button>
                            )}
                            <input
                              readOnly
                              type="number"
                              value={item.quantity}
                            />
                            {order.orderStatus == "Processing" && (
                              <button onClick={() => increaseQuantity(idx)}>
                                +
                              </button>
                            )}
                          </div>

                          <div className="cartitemholderquantity">
                            
                            {findInventory(
                              item.name,
                              item.SubCategory,
                              item.ProductSize.split(",", 1),
                              idx
                            )}
                          </div>
                          
                        </div>
                      ))}
                  </div>
                </div>
                <div className="printComponent">
                  <ReactToPrint
                    trigger={() => <PrintIcon className="PrintIcon" />}
                    content={() => componentRef.current}
                  />{" "}
                  <p>
                    <span>Print</span>
                  </p>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display:
                    order.orderStatus === "Delivered" ? "block" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="null">Choose Category</option>
                      {/* {order.orderStatus === "Processing" && (
                        <option value="Packing">Packing started</option>
                      )} */}
                      {/* {order.orderStatus === "Processing" && (
                        <option value="Delivered">Packed and Delivered</option>
                      )}  */}
                      {order.orderStatus === "Processing" && (
                        <option value="CheckEmail">Check Email</option>
                      )}
                      {order.orderStatus === "Processing" && (
                        <option value="Printed">Printed</option>
                      )}
                      {order.orderStatus === "Processing" && (
                        <option value="Ready for Pickup">
                          Ready for Pickup
                        </option>
                      )}
                      {order.orderStatus === "Printed" && (
                        <option value="Ready for Pickup">
                          Ready for Pickup
                        </option>
                      )}
                      {order.orderStatus === "CheckEmail" && (
                        <option value="Ready for Pickup">
                          Ready for Pickup
                        </option>
                      )}
                       {order.orderStatus === "CheckEmail" && (
                        <option value="Delivered">Delivered</option>
                      )}
                      {order.orderStatus === "Printed" && (
                        <option value="Delivered">Delivered</option>
                      )}
                      {order.orderStatus === "CheckEmail" && (
                        <option value="Processing">Revert to Processing</option>
                      )}
                      {order.orderStatus === "Printed" && (
                        <option value="Processing">Revert to Processing</option>
                      )}

                      {order.orderStatus === "Processing" && (
                        <option value="Delivered">Delivered</option>
                      )}

                      {/* {order.orderStatus === "Delivered" && (
                        <option value="revertpacking">Revert to Packing</option>
                      )}   */}

                      {order.orderStatus === "Delivered" && (
                        <option value="Processing">Revert to Processing</option>
                      )}

                      {order.orderStatus === "Packing" && (
                        <option value="Ready for Pickup">
                          Ready for Pickup
                        </option>
                      )}

                      {order.orderStatus === "Packing" && (
                        <option value="Delivered">Delivered</option>
                      )}

                      {order.orderStatus === "Ready for Pickup" && (
                        <option value="Delivered">Delivered</option>
                      )}
                      {/* {order.orderStatus === "Ready for Pickup" && (
                        <option value="revertpacked">Revert to Packing</option>
                      )}   */}

                      {order.orderStatus === "Ready for Pickup" && (
                        <option value="Processing">Revert to Processing</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status == "null" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
