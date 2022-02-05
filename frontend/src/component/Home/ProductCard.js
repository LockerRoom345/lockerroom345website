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
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handlesubcatChange = (e) => {
    setSubCategory(e.target.value);
    //console.log((SubCategory[e.target.value]))
  };

  const handlesizeChange = (e) => {
    setProductSize(e.target.value);
    //console.log((ProductSize[e.target.value]))
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
          <select name="category" id="category" onChange={
            (e) => {handlesubcatChange(e);}
          }>
            <option value="SelectCategory">Select SubCategory</option>
            <option value="men">Mens sizing</option>
            <option value="women">Womens sizing</option>
            <option value="boys">Boys' sizing</option>
            <option value="girls">Girls' sizing</option>
            <option value="toddler">Toddlers sizing</option>
          </select>
        </div>
        <div className="size">        
          <select name="size" id="size" onChange={(e)=>{
            handlesizeChange(e);
          }}>
            <option value="selectsize">Select Size</option>
            <option value="2T">2T</option>
            <option value="3T">3T</option>
            <option value="4T">4T</option>
            <option value="XX Small">XX Small</option>
            <option value="X Small">X Small</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="X Large">X Large</option>
            <option value="XX Large">XX Large</option>
            <option value="XXX Large">XXX Large</option>
            <option value="4X Large">4X Large</option>
          </select>
        </div>
        <div className="stock">
          <p>
            Status:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b> <br/>
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
