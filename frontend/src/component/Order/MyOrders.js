import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteOrderuser, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Header from "../layout/Header/Header";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "@material-ui/core";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const MyOrders = ({ history }) => {
  const categories = ["All", "Current", "Previous"];

  const [category, setCategory] = useState("Current");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const deleteOrderHandler = (id) => {
    
    dispatch(deleteOrder(id));
  };
  console.log(orders);
  const { user } = useSelector((state) => state.user);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "OrderDate",
      sort: "desc",
    },
  ]);
  const handleSortChange = (model) => {
    /* if statement to prevent the infinite loop by confirming model is 
     different than the current sortModel state */
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };
  const submit = (params) => {
    confirmAlert({
      title: "Delete Order",
      message: "Are you sure you want to delete this order",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteOrderHandler(params.getValue(params.id, "id")),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch(getAllOrders());
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(myOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const columns = [
    //{ field: "id", headerName: "Order ID", minWidth: 250, flex: 0.5 },
    {
      field: "orderfrom",
      headerName: "Ordered By",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "studentId",
      headerName: "Student ID",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : params.getValue(params.id, "status") === "Ready for Pickup"
          ? "BlueColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 200,
      flex: 0,
    },
    {
      field: "actions",
      flex: 0,
      filterable: false,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
          <Button onClick={() => submit(params)}>
          <DeleteIcon />
        </Button>
        </Fragment>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      console.log(category);
      console.log(item.orderStatus);
      if (category == "All") {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          OrderDate: moment(item.shippingInfo.orderDate).format('MM-DD-YYYY hh:mm a'),
          status:
            item.orderStatus == "Printed" ? "Processing" : item.orderStatus,
          amount: item.totalPrice,
          studentId: item.shippingInfo.receivingPersonName.split("_")[0],
          orderfrom: user.name,
        });
      }
      if (
        category == "Current" &&
        (item.orderStatus == "Processing" || item.orderStatus == "Printed" || item.orderStatus == "CheckEmail" )
      ) {
        // console.log(moment(item.shippingInfo.orderDate).format('MM-DD-YYYY hh:mm a'));
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          OrderDate: moment(item.shippingInfo.orderDate).format('MM-DD-YYYY hh:mm a'),
          status:
            item.orderStatus == "Printed" ? "Processing" : item.orderStatus,
          amount: item.totalPrice,
          studentId: item.shippingInfo.receivingPersonName.split("_")[0],
          orderfrom: user.name,
        });
      }
      if (category == "Previous" && item.orderStatus == "Delivered") {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          OrderDate: moment(item.shippingInfo.orderDate).format('MM-DD-YYYY hh:mm a'),
          status: item.orderStatus,
          amount: item.totalPrice,
          studentId: item.shippingInfo.receivingPersonName.split("_")[0],
          orderfrom: user.name,
        });
      }
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <div>
      <Fragment>
        <MetaData title={`LR345 - Orders`} />

        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <div className="orderToggle">
              <fieldset>
                <Typography component="legend">Filter</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </fieldset>
              <p> {category} Orders</p>
              {/* <div className="eachRadioButton">
                <input type="radio" value="current" checked={toggle === 'current'} onChange={handleOptionChange1()} /> Current Orders
              </div>

              <div className="eachRadioButton">
                <input type="radio" value="past" checked={toggle === 'past'} onChange={handleOptionChange2()}/> Past Orders
              </div> */}
            </div>
            <DataGrid
              sortModel={sortModel}
              onSortModelChange={(model) => handleSortChange(model)}
              rows={rows}
              columns={columns}
              pageSize={15}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">My Orders</Typography>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default MyOrders;