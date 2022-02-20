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
    //console.log("product", product);
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    // for (let i = 0; i < product.ProductSize.length; i++) {
    //   for (const [key, value] of Object.entries(product.ProductSize[0])) {
    //     console.log(`${key}: ${value}`);
    //   }
    // }
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
  const addToCartHandler = (e) => {
    e.preventDefault();
    if (SubCategory.trim() === "" || ProductSize.trim() == "" || SubCategory.trim() === "SelectCategory" || ProductSize.trim() == "selectsize") {
      alert.show("required Subcategory and Size field");
    } else {
      //console.log("clicked");
      dispatch(addItemsToCart(product._id, quantity, SubCategory, ProductSize));
      alert.success("Item Added To Cart");
    }
  };

  return (
    // <Link className="productCard" to={`/product/${product._id}`}>
    <form
      onSubmit={(e) => {
        addToCartHandler(e);
      }}
    >
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
              required
            >
              <option value="SelectCategory">Select SubCategory</option>
              <option value="Mens sizing">Mens sizing</option>
              <option value="Womens sizing">Womens sizing</option>
              <option value="Boys' sizing">Boys' sizing</option>
              <option value="Girls' sizin">Girls' sizing</option>
              <option value="Toddlers sizing">Toddlers sizing</option>
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
                required
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
              <b
                className={
                  product &&
                  product.ProductSize &&
                  product.ProductSize.find(
                    (item) => item.size == ProductSize
                  ) &&
                  product.ProductSize.find((item) => item.size == ProductSize)
                    .stock <= 0
                    ? "redColor"
                    : "greenColor"
                }
              >
                {product.ProductSize.find((item) => item.size == ProductSize) &&
                product.ProductSize.find((item) => item.size == ProductSize)
                  .stock < 1
                  ? "OutOfStock"
                  : "InStock"}
              </b>
              <br />
              {/* <button
                    disabled={product.Stock < 1 ? false : true}                    
                    onClick={takeToRequestForm}
                  >Request</button> */}
            </p>
          </div>
          <div className="addshopcart">
            <button
              // onClick={addToCartHandler}
              disabled={
                product.ProductSize.find((item) => item.size == ProductSize) &&
                product.ProductSize.find((item) => item.size == ProductSize)
                  .stock < 1
                  ? true
                  : false
              }
            >
              <AddShoppingCartIcon
                disabled={
                  product.ProductSize.find(
                    (item) => item.size == ProductSize
                  ) &&
                  product.ProductSize.find((item) => item.size == ProductSize)
                    .stock < 1
                    ? true
                    : false
                }
              />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </form>

    // </Link>
  );
};

export default ProductCard;
