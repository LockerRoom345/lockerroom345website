import React, { Fragment, useEffect, useState, useRef } from "react";
import { getAllOrders } from "../../actions/orderAction"; 
import { useDispatch, useSelector } from "react-redux";
import "./GenerateReport.css";
import { Typography } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.allOrders); // Adjust according to your state structure
  const [mostOrderedItems, setMostOrderedItems] = useState([]);
  const [mostOrderingSchools, setMostOrderingSchools] = useState([]);
  //const [mostOrderedSizes, setMostOrderedSizes] = useState([]);
  const [totalStudentsHelped, setTotalStudentsHelped] = useState(0);
  const [totalOrdersFulfilled, setTotalOrdersFulfilled] = useState(0);
  const [TotalOrdersReceived, setTotalOrdersReceived] = useState(0);
  
  const [totalItemsFulfilled, setTotalItemsFulfilled] = useState(0);
  const [averageFulfillmentTime, setAverageFulfillmentTime] = useState(0);
  
  const componentRef = useRef();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      processInsights(orders);
    }
  }, [orders]);

  const processInsights = (orders) => {
    const itemCounts = {};
    const schoolCounts = {};
    const sizeCounts = {};
    let studentsHelped = new Set(); // Using a Set to count unique students
    let itemsFulfilled = 0;
    let totalFulfillmentTime = 0;
    let countFulfilledOrders = 0;
  
    orders.forEach((order) => {
      if (order.createdAt && order.deliveredAt && order.orderStatus === 'Delivered') {
        const createdAt = new Date(order.createdAt);
        const deliveredAt = new Date(order.deliveredAt);
        totalFulfillmentTime += (deliveredAt - createdAt)/(1000 * 60 * 60);
        countFulfilledOrders++;
      }
    
      // Count each student only once
      studentsHelped.add(order.shippingInfo.receivingPersonName);
  
      order.orderItems.forEach((item) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
        sizeCounts[item.ProductSize] = (sizeCounts[item.ProductSize] || 0) + 1;
        itemsFulfilled += item.quantity;
      });
  
      schoolCounts[order.shippingInfo.userName] = (schoolCounts[order.shippingInfo.userName] || 0) + 1;
    });
  
    setMostOrderedItems(Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 11));
    setMostOrderingSchools(Object.entries(schoolCounts).sort((a, b) => b[1] - a[1]).slice(0, 11));
    //setMostOrderedSizes(Object.entries(sizeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5));
    setTotalStudentsHelped(studentsHelped.size);
    setTotalOrdersReceived(orders.length);
    setTotalOrdersFulfilled(countFulfilledOrders);
    setTotalItemsFulfilled(itemsFulfilled);
    if (countFulfilledOrders > 0) {
      const averageTimeInHours = totalFulfillmentTime / countFulfilledOrders;
      setAverageFulfillmentTime(averageTimeInHours); // Set average time in hours
    }
  };

  return (
    <Fragment>
      <div className="reportPage" ref={componentRef}>
        <Typography component="h1" className="reportTitle">LR345 Report</Typography>
        
        <div className="reportGrid">
          <section className="reportSection">
            <Typography component="h2">Most Ordered Items</Typography>
            <ul>
              {mostOrderedItems.map(([name, count], index) => (
                <li key={index}>{name} - {count}</li>
              ))}
            </ul>
          </section>

          <section className="reportSection">
            <Typography component="h2">Most Ordering Schools</Typography>
            <ul>
              {mostOrderingSchools.map(([name, count], index) => (
                <li key={index}>{name.toUpperCase()} - {count}</li>
              ))}
            </ul>
          </section>


          {/* <section className="reportSection">
  <Typography component="h2">Most Ordered Sizes</Typography>
  <ul>
    {mostOrderedSizes.map(([size, count], index) => (
      <li key={index}>{size} - {count}</li>
    ))}
  </ul>
</section> */}
          <section className="reportSection">
          <Typography component="h2">Average Order Fulfillment Time</Typography>
          <p>{averageFulfillmentTime.toFixed(0)} Hours</p>
        </section>
          <section className="reportSection">
            <Typography component="h2">Number of Students Helped</Typography>
            <p>{totalOrdersFulfilled}</p>
          </section>
           
          <section className="reportSection">
            <Typography component="h2">Orders Summary</Typography>
            <p>Number of Orders Fulfilled: {totalOrdersFulfilled}</p>
            <p>-------------------------</p>
            <p>Number of Orders Received: {TotalOrdersReceived}</p>
          </section>

          <section className="reportSection">
            <Typography component="h2">Number of Items Fulfilled</Typography>
            <p>{totalItemsFulfilled}</p>
          </section>
        </div>

        <div className="printComponent">
          <ReactToPrint
            trigger={() => <PrintIcon className="PrintIcon" />}
            content={() => componentRef.current}
          />
          <p><span>Print</span></p>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
