import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  let instock = 0;
  let outstockincr = 0;

  let stockarray = products.map((x) =>
    x.ProductSize.map((y) => y.stock).sort((a, b) => a - b)
  );
  stockarray.map((x) => {
    if (x.includes(0)) {
      outstockincr += 1;
    }
    // x.map((y) => {
    //   if (y.includes(0)) {
    //     //console.log(x);
    //     outstockincr += 1;

    //   }
    // }      )
  });
  console.log("out of stock list", stockarray);
  console.log("overall items out of stock is", outstockincr);

  // for(let i =0; i< 3; i++){
  //   for (const [key, value] of Object.entries(products.ProductSize[0])) {
  //     console.log(`${key}: ${value}`);
  //   }
  //   }

  // products &&
  //   products.forEach((item) => {
  //     if (item.Stock === 0) {
  //       outOfStock += 1;
  //     }
  //   });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#065749"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#d53f3f", "#7cd583"],
        hoverBackgroundColor: ["#ad2626", "#60d66a"],
        data: [outstockincr, products.length - outstockincr],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Inventory Management</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Summary <br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/orders">
              <p>Orders Received</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/products">
              <p>Item Availability</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Manage Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>

          <div>
            <p>
              Stock Status <br />
            </p>
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
