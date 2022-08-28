import React from "react";
import "./CartItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <button onClick={() => deleteCartItems(item.product, item)}>
        <DeleteIcon />
      </button>
      <img src={item.image} alt="ssa" />
      <div>
        {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
        <h4>{item.name}</h4>
        {/* <span>{`Price: $${item.price}`}</span> */}
        {/* <span>{`Price: $0`}</span> */}
        <span>{`SubCategory: ${item.SubCategory}`}</span>
        <span>{`Size: ${item.ProductSize}`}</span>
      </div>
    </div>
  );
};

export default CartItemCard;
