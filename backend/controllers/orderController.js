const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const nodemailer = require("nodemailer");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    Email,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    Email,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Send Email once new order is being created
exports.emailNewOrder = catchAsyncErrors(async (req, res, next) => {
  console.log("Trying to send email");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  var total = 0;
  //console.log(today);
  const order = await Order.find({ createdAt: { $gte: new Date(today) } });
  order.forEach((order1) => {
    //console.log(order1.createdAt + " FOR EACH INSIDE");
    // console.log("FOR EACH INSIDE");
    total = total + 1;
  });
  //console.log(total);

  //console.log("Trying to send email");
  let { text } = "Test email received";
  const transport = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    secure: true,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  await transport.sendMail({
    from: process.env.SMPT_MAIL,
    to: "sri.madhaven@gmail.com",
    subject: "Daily Update",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Automatic Mailer Bot</h2>
        <p>You got ${total} new orders!</p>
    
        <p>All the best, School Prism Team</p>
         </div>
    `,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const order = await Order.findById(req.params.id);
  // console.log("order from inventory", order);
  const newQuantities = req.body.newQuantity.split(",");
  console.log(newQuantities);
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  // if (order.orderStatus === "Delivered") {
  //   return next(new ErrorHander("You have already delivered this order", 400));
  // }

  if ( req.body.status === "Printed" ||
  req.body.status === "Delivered" ||
  req.body.status === "Ready for Pickup"||
  req.body.status === "CheckEmail") {
    order.orderItems.forEach(async (o, idx) => {
      o.quantity = newQuantities[idx];
      console.log("orderItems forward", o);
      await updateStock(o.product, o.quantity, o.ProductSize);
    });
  }

  if (req.body.status === "Processing") {
    if (order.orderStatus === "Delivered" || order.orderStatus === "packed") {
      order.orderItems.forEach(async (o, idx) => {
        console.log("orderItems back", o);
        await reAddStock(o.product, o.quantity, o.ProductSize);
      });
    }
  }
  if (req.body.status === "revertpacked") {
    if (order.orderStatus === "Delivered") {
      req.body.status = "Packing";
    }
  }

  // if (req.body.status === "revertpicked") {
  //   req.body.status = "picked";
  // }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function reAddStock(id, quantity, ProductSize) {
  const product = await Product.findById(id);
  console.log("product to be readded");
  try {
    product.ProductSize.forEach((x) => {
      if (x.size === ProductSize) {
        //console.log(x.stock);
        x.stock = parseInt(x.stock) + parseInt(quantity);
      }
    });
    //console.log("after readded", product);

    await product.save({ validateBeforeSave: false });
  } catch (e) {
    console.log("PRODUCT NOT FOUND");
  }
}

async function updateStock(id, quantity, ProductSize) {
  const product = await Product.findById(id);
  console.log("product to be updated");
  try {
    product.ProductSize.forEach((x) => {
      if (x.size === ProductSize) {
        //console.log(x.stock);
        x.stock -= quantity;
      }
    });
    await product.save({ validateBeforeSave: false });
  } catch (e) {
    console.log("PRODUCT NOT FOUND");
  }

  //console.log("after update", product);
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
exports.deleteOrderuser = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.remove();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
