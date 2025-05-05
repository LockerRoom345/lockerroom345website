import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
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
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [sortModel, setSortModel] = useState([
    {
      field: "OrderDate",
      sort: "desc",
    },
  ]);

  const handleSortChange = (model) => {
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const confirmDelete = (params) => {
    confirmAlert({
      title: "Delete Order",
      message: "Are you sure you want to delete this order?",
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
      type: "dateTime",
      minWidth: 50,
      flex: 0.1,
      valueFormatter: (params) => {
        const raw = params.value;
        if (!raw) return "N/A";

        const parsed = moment.utc(raw);
        if (!parsed.isValid()) return "N/A";

        return parsed.local().format("MM-DD-YYYY h:mm A");
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      flex: 0.1,
      cellClassName: (params) => {
        const status = params.getValue(params.id, "status");
        if (status === "Delivered") return "greenColor";
        if (status === "Ready for Pickup") return "BlueColor";
        return "redColor";
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
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
            <span>View</span>
          </Link>
          <Button onClick={() => confirmDelete(params)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      const tempname = item.shippingInfo.receivingPersonName?.split("_")[0] || "";
      const addressParts = item.shippingInfo.userAddress?.split("|") || [];
      const district = addressParts[1] || "-";

      let orderDate;
      try {
        const rawDate = item?.shippingInfo?.orderDate;
        const parsed = moment(rawDate);
        orderDate = parsed.isValid() ? parsed.toISOString() : null;
      } catch {
        orderDate = null;
      }

      // Only include undelivered or recently delivered orders (≤ 1 month ago)
      const isRecentDelivery =
        item.orderStatus !== "Delivered" ||
        moment().diff(moment(item.shippingInfo.deliveryDate), "months") <= 1;

      if (isRecentDelivery) {
        rows.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          amount: item.totalPrice,
          OrderDate: orderDate,
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
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS RECEIVED</h1>

          <DataGrid
            sortModel={sortModel}
            onSortModelChange={handleSortChange}
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
