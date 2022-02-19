import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ product, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [requestForm, setrequestForm] = useState(false);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const takeToRequestForm = () => {
    setrequestForm(true);
    //console.log(requestForm);
    //history.push("/requestform");
    window.location.href = "http://localhost:3000/requestform";
  };

  const [SubCategory, setSubCategory] = useState("");
  const [ProductSize, setProductSize] = useState("");

  const increaseQuantity = () => {
    //console.log("product",product.name);
    console.log("product", product);
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    for (let i = 0; i < product.ProductSize.length; i++) {
      for (const [key, value] of Object.entries(product.ProductSize[0])) {
        console.log(`${key}: ${value}`);
      }
    }
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handlesubcatChange = (e) => {
    setSubCategory(e.target.value);
    //console.log((SubCategory[e.target.value]))
  };

  const handlesizeChange = (e) => {
    console.log(product);
    setProductSize(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity, SubCategory, ProductSize));
    alert.success("Item Added To Cart");
  };

  return (
    // <Link className="productCard" to={`/product/${product._id}`}>
    <div className="productCard">
      <img src={product.images[0].url} alt={product.name} />

      <div className="productCardDesc">
        {/* {"Product Name :"} */}
        <div className="productname">
          <p>{product.name}</p>
        </div>
        {/* <Rating {...options} />{" "} */}
        <div className="productCardSpan">
          <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
            <input readOnly type="number" value={quantity} />
            <button onClick={increaseQuantity}>+</button>
          </div>
          {/* ({product.numOfReviews} Reviews) */}
        </div>
        <div className="category">
          <select
            name="category"
            id="category"
            onChange={(e) => {
              handlesubcatChange(e);
            }}
          >
            <option value="SelectCategory">Select SubCategory</option>
            <option value="men">Mens sizing</option>
            <option value="women">Womens sizing</option>
            <option value="boys">Boys' sizing</option>
            <option value="girls">Girls' sizing</option>
            <option value="toddler">Toddlers sizing</option>
          </select>
        </div>
        <div className="size">
          {product && product.ProductSize && (
            <select
              name="size"
              id="size"
              onChange={(e) => {
                handlesizeChange(e);
              }}
            >
              <option value="selectsize">Select Size</option>
              {/* {Object.entries(product.ProductSize[0]).map((k,v) =>              
                <option value={k}>
                  {k[0]}
                </option>              
            )}           */}
            {product.ProductSize.map((item, index) => (
                    <option key={item.size} value={item.size}>
                      {item.size}
                    </option>
                  ))}
            
            </select>
          )}
        </div>
        <div className="stock">
          <p>
            Status:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>{" "}
            <br />
            {/* <button
                    disabled={product.Stock < 1 ? false : true}                    
                    onClick={takeToRequestForm}
                  >Request</button> */}
          </p>
        </div>
        <div className="addshopcart" onClick={addToCartHandler}>
          <button disabled={product.Stock < 1 ? true : false}>
            <AddShoppingCartIcon />
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    // </Link>
  );
};

export default ProductCard;
