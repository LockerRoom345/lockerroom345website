import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import moment from "moment";

  

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
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
  const { order, loading } = useSelector((state) => state.orderDetails);
  
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
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    //{ field: "orderId", headerName: "Order ID", minWidth: 60, flex: 0.1 },
    {
      field: "orderfrom",
      headerName: "Ordered By",
      type: "string",
      minWidth: 50,
      flex: 0.15,
    },
    {
      field: "district",
      headerName: "District",
      type: "string",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "studentId",
      headerName: "Student ID",
      type: "string",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      type: "string",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      flex: 0.1,
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
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 60,
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              {/* <EditIcon /> */}
              <span>View</span>
            </Link>
            <Button onClick={() => submit(params)}>
              <DeleteIcon />
            </Button>

            {/* <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      console.log(item, item.shippingInfo.receivingPersonName);
      let tempname = "";
      if (typeof item.shippingInfo.receivingPersonName === "undefined") {
        tempname = "";
      } else {
        tempname = item.shippingInfo.receivingPersonName.split("_")[0];
      }
      let addressSplit =
        item.shippingInfo.userAddress &&
        item.shippingInfo.userAddress.split("|");
      let district = "";
      if (addressSplit.length == 2) {
        district = addressSplit[1];
      } else {
        district = "-";
      }
      if (
        item.orderStatus !== 'Delivered' ||
        (item.orderStatus === 'Delivered' &&
          moment().diff(moment(item.shippingInfo.deliveryDate), 'months') <= 1)
      ){
      rows.push({
        id: item._id,
        //orderId: item.orderId,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        OrderDate: moment(item.shippingInfo.orderDate).format(
          "MM-DD-YYYY hh:mm a"
        ),
        status: item.orderStatus,
        studentId: tempname,
        district: district,
        orderfrom: item.shippingInfo.userName,
      });
    }
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS RECEIVED</h1>

          <DataGrid
            sortModel={sortModel}
            onSortModelChange={(model) => handleSortChange(model)}
            // onSortModelChange={(model) => {
            //   console.log(model);
            //   // if(model != sortModel)
            //   // setSortModel(model);
            // }}
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
