import React, { Fragment, useEffect, useRef } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import moment from "moment";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { shippingInfo } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const alert = useAlert();
  const componentRef = useRef();
  useEffect(() => {
    console.log(order);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage" ref={componentRef}>
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order.orderId}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Order Placed by:</p>
                  <span>{order.user && order.user.name}</span>
                  <hr></hr>
                  <span>&nbsp;</span>
                  <p>Teacher's Name:</p>
                  <span>{shippingInfo.userLoggedInDesignation}</span>
                </div>
                <div>
                  <p>Deliver To Student ID:</p>
                  <span>{shippingInfo.receivingPersonName.split("_")[0]}</span>
                </div>
                <div>
                  <p>Student Age:</p>
                  <span>{shippingInfo.receivingPersonName.split("_")[1]}</span>
                </div>
                <div>
                  <p>Student Gender:</p>
                  <span>{shippingInfo.receivingPersonName.split("_")[2]}</span>
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
                      order.shippingInfo.userAddress.split("|").length == 2 &&
                      order.shippingInfo.userAddress.split("|")[1]}
                    {order.shippingInfo &&
                      order.shippingInfo.userAddress.split("|").length == 1 &&
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
              <div className="emailUsButton">
                <a href="mailto:lockerroom345@gmail.com">
                  <button>Email Us at:  lockerroom345@gmail.com </button>
                </a>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : order.orderStatus &&
                          order.orderStatus === "Ready for Pickup"
                        ? "yellowColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus == "Printed"
                      ? "Processing"
                      : order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div className="cartitemholder" key={item.product}>
                      <div className="cartitemholderimage">
                        <img src={item.image} alt="Product" />
                      </div>
                      <div className="cartitemholdername">
                        <span>{item.name}</span>
                      </div>
                      <div className="cartitemholdercat">
                        <span>Subcategory({item.SubCategory})</span>
                      </div>
                      <div className="cartitemholdersize">
                        <span>Size({item.ProductSize.split(",", 1)})</span>
                      </div>
                      <div className="cartitemholderquantity">
                        <span>Quantity({item.quantity})</span>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
