import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/dicks_logo.svg";
import logo from "../../../images/lockerroomlogo.PNG";
import { logout } from "../../../actions/userAction";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { lightGreen } from "@mui/material/colors";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = ({}) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // const role = user.role

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  async function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    history.push("/");
  }

  function account() {
    history.push("/account");
  }

  function home() {
    history.push("/");
  }

  function products() {
    history.push("/products");
  }
  function orders() {
    history.push("/orders");
  }

  function cart() {
    history.push("/cart");
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function adminorders() {
    history.push("/admin/orders");
  }

  function adminproducts() {
    history.push("/admin/products");
  }

  function adminproduct() {
    history.push("/admin/product");
  }

  function adminusers() {
    history.push("/admin/users");
  }

  function adminregister() {
    history.push("/register");
  }



  return (
    <div className="navbar">
      {user && user.role === "user" && (
        <li>
          <HomeIcon />
          <Button onClick={home}>Home</Button>
        </li>
      )}

        {user && user.role === "admin" && (
          <li>
            <DashboardIcon />
            <Button onClick={dashboard}>Dashboard</Button>
          </li>
      )}    

      {/* <li>
        <Inventory2Icon />
        <Button onClick={products}>Products</Button>
      </li> */}
      {user && user.role === "user" && (
        <li>
          <ListAltIcon />
          <Button onClick={orders}>My Orders</Button>
        </li>
      )}
       {user && user.role === "admin" && (
        <li>
          <ListAltIcon />
          <Button onClick={adminorders}>All Orders</Button>
        </li>
      )}
      {user && user.role === "user" && (
        <li>
          <PersonIcon />
          <Button onClick={account}>My Account</Button>
        </li>
      )}
      {user && user.role === "admin" && (
        <li>
          <PostAddIcon />
          <Button onClick={adminproducts}>All Products</Button>
        </li>
      )}
      {user && user.role === "user" && (
        <li>
          <ShoppingCartIcon />
          <Button onClick={cart}>My Cart ({cartItems.length})</Button>
        </li>
      )}
      {user && user.role === "admin" && (
        <li>
          <AddIcon />
          <Button onClick={adminproduct}>Add Products</Button>
        </li>
      )}

      {user && user.role === "admin" && (
        <li>
          <PeopleIcon />
          <Button onClick={adminusers}>Users</Button>
        </li>
      )}

      {user && user.role === "admin" && (
        <li>
          <PersonAddIcon />
          <Button onClick={adminregister}>Add Users</Button>
        </li>
      )}

      <li className="logoutli">        <ExitToAppIcon className="icon" />
        <Button onClick={logoutUser}>Logout</Button>
      </li>
    </div>
  );
};

export default Header;
