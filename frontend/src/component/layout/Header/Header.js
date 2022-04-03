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
import HelpIcon from '@mui/icons-material/Help';
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
  function helpuse() {
    history.push("/helpuse");
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

  function setProduct(type) {
    if(type === 'products'){
      history.push("/admin/products");
    }
    else if(type === 'product'){
      history.push("/admin/product");
    }
    
  }

  function setUsers(type) {
    if(type === 'users'){
      history.push("/admin/users");
    }
    else if(type === 'addUsers'){
      history.push("/register");
    }
    
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
       {user && (user.role === "user" || user.role === "admin" || user.role === "volunteer") && (
        <li>
          <HelpIcon />
          <Button onClick={helpuse}>How To Use</Button>
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
          <select
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                <option value=''>PRODUCTS</option>
                <option value='products'>Show All Products</option>
                <option value='product'>Add Product</option>
              </select>
        </li>
      )}

      {user && user.role === "admin" && (
        <li>
          <PeopleIcon />
          <select
                onChange={(e) => {
                  setUsers(e.target.value);
                }}
              >
                <option value=''>USERS</option>
                <option value='users'>Show All Users</option>
                <option value='addUsers'>Add Users</option>
              </select>
        </li>
      )}

      <li className="logoutli">        <ExitToAppIcon className="icon" />
        <Button onClick={logoutUser}>Logout</Button>
      </li>
    </div>
  );
};

export default Header;
