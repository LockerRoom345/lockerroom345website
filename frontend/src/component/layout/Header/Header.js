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

  return (
    <div className="navbar">
      {user && user.role === "user" && (
        <li>
          <HomeIcon />
          <Button onClick={home}>Home</Button>
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

      <li className="logoutli">
        <ExitToAppIcon className="icon" />
        <Button onClick={logoutUser}>Logout</Button>
      </li>
    </div>
  );
};

export default Header;
