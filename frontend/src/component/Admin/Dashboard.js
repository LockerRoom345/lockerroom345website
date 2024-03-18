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
import ReactTooltip from "react-tooltip";
import lockerroomlogo from "../../images/lockerroomlogo.PNG";
import Footer from "../../component/layout/Footer/Footer";
import ReactHover, { Trigger, Hover } from "react-hover";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);

  let outOfStock = 0;

  let instock = 0;
  let outstockincr = 0;
  let totalOutOfStock = 0;

  //console.log(products);
  let stockarray = products.map((x) =>
    x.ProductSize.map((y) => y.stock).sort((a, b) => a - b)
  );
  stockarray.map((x) => {
    if (x.includes("0")) {
      outstockincr += 1;
    }
    //console.log(outstockincr);

    // x.map((y) => {
    //   if (y.includes(0)) {
    //     ////console.log(x);
    //     outstockincr += 1;

    //   }
    // }      )
  });
  // console.log( outstockincr);
  // //console.log("out of stock list", stockarray);
  // //console.log("overall items out of stock is", outstockincr);

  // for(let i =0; i< 3; i++){
  //   for (const [key, value] of Object.entries(products.ProductSize[0])) {
  //     //console.log(`${key}: ${value}`);
  //   }
  //   }

  // products &&
  //   products.forEach((item) => {
  //     if (item.Stock === 0) {
  //       outOfStock += 1;
  //     }
  //   });
  const navigateToOrderDetails = () => {
    history.push('/generate-report');
  };
  
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

  const renderSubCategoryTag = (subCategory) => {
    // console.log(subCategory);
    if (subCategory.toLowerCase().includes("men")) return "MENS";
    if (subCategory.toLowerCase().includes("women")) return "WOMENS";
    if (subCategory.toLowerCase().includes("boy")) return "BOYS";
    if (subCategory.toLowerCase().includes("girl")) return "GIRLS";
    if (subCategory.toLowerCase().includes("toddler")) return "TODDLERS";
    if (subCategory.toLowerCase().includes("adult")) return "ADULTS";
  };

  const renderHoverSizeText = (sizes) => {
    const sizeArray = sizes.split(",");
    let x = [];
    sizeArray.filter((size) => {
      x.push(<div className={"hoversizeText"}>{size}</div>);
    });
    return x;
  };
  const stockData = () => {
    var outOfStockProductArray = products.filter(
      (product) =>
        product.ProductSize.filter(
          (item) => item.stock == 0 || item.stock == "0"
        ).length
    );
    var renderText = [];
    var outOfStockcheck = [];
    var displayArr = [];
    // console.log(outOfStockProductArray);
    // console.log(outOfStockcheck);
    outOfStockProductArray.filter((product) => {
      product.ProductSize.filter((item) => {
        if (item.stock == 0 || item.stock == "0") {
          const i = outOfStockcheck.findIndex((e) => e.name === product.name);
          if (i >= 0) {
            var object = outOfStockcheck[i];
            object.sizes =
              object.sizes + "," + product.SubCategory + " | " + item.size;
          } else {
            outOfStockcheck.push({
              name: product.name,
              sizes: product.SubCategory + " | " + item.size,
            });
          }
        }
      });
    });
    // console.log(outOfStockcheck);

    var x = outOfStockProductArray.filter((product, idx1) => {
      product.ProductSize.filter((item, idx2) => {
        if (item.stock == 0 || item.stock == "0") {
          // console.log(product.name, item.size);
          const i = outOfStockcheck.findIndex((e) => e.name === product.name);
          if (!displayArr.includes(product.name))
            renderText.push(
              <div className="outofStockProdWrapper" id={idx1 + idx2}>
                <ReactHover
                  options={{ followCursor: true, shiftX: -100, shiftY: 20 }}
                >
                  <Trigger type="trigger">
                    <div className="outofStockProd">
                      {/* {product.name} */}
                      <div className="name">{product.name}</div>
                      <InfoIcon />
                      {/* <div className="size">
                        {" "}
                        {renderSubCategoryTag(product.SubCategory)}
                      </div> */}
                    </div>
                  </Trigger>
                  <Hover type="hover">
                    <div className="hovername">
                      {renderHoverSizeText(outOfStockcheck[i].sizes)}
                    </div>
                  </Hover>
                </ReactHover>
              </div>
            );
          displayArr.push(product.name);
        }
      });
    });
    // console.log(renderText);
    return renderText;
  };
  // console.log(products);
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      {/* <Sidebar /> */}
      
      <div className="dashboardContainer">
        <Typography component="h1">Inventory Management</Typography>
        
        <div className="dashboardSummary">
          <div>
            <p>
              Summary <br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            {(user.role == "admin" || user.role == "volunteer") && (
              <Link
                to="/admin/orders"
                data-tip="Click Me"
                data-for="toolTip1"
                data-place="bottom"
                data-type="info"
              >
                <p>Orders Received</p>
                <p>
                  {orders &&
                    orders.filter((order) => order.orderStatus == "Processing")
                      .length}
                </p>

                <ReactTooltip id="toolTip1" />
              </Link>
            )}
            {user.role == "admin" && (
              <Link
                to="/admin/products"
                data-tip="Click Me"
                data-for="toolTip2"
                data-place="bottom"
                data-type="info"
              >
                <p>Item Availability</p>
                <p>{products && products.length}</p>
                <ReactTooltip id="toolTip2" />
              </Link>
            )}
            {user.role == "admin" && (
              <Link
                to="/admin/users"
                data-tip="Click Me"
                data-for="toolTip3"
                data-place="bottom"
                data-type="info"
              >
                <p>Manage Users</p>
                <p>{users && users.length}</p>
                <ReactTooltip id="toolTip3" />
              </Link>
              
            )}
            <div className="dashboardSummaryBox22">
            {user.role == "admin" && (
              <Link
                to="/generate-report"
                data-tip="Click Me"
                data-for="toolTip4"
                data-place="bottom"
                data-type="info"
              >
                <p>Generate Report ✨</p>
                
                <ReactTooltip id="toolTip4" />
              </Link>
              
            )}</div>
          </div>
          <div>
            <p>
              Stock Status <br />
            </p>
          </div>
          <div className="doughnutChart">
            <div className="donutWrapper">
              {" "}
              <Doughnut data={doughnutState} />
            </div>
            <div className="rightWrapper">
              {" "}
              <p>List of Items Out of Stock</p>
              <div className="outOfStockWrapper">{stockData()}</div>
            </div>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Dashboard;
