import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AddIcon from "@material-ui/icons/Add";

import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HeightIcon from "@mui/icons-material/Height";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [reload, setReload] = useState(false);

  // const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [ProductSize, setProductSize] = useState("");
  const [Stock, setStock] = useState(0);
  const [newStock, setNewStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Footwear", "Clothing", "Sports", "Miscellaneous"];

  const productId = match.params.id;

  useEffect(() => {
    console.log("enter");
    if (product && product._id !== productId) {
      console.log("entering getProductDetails");
      dispatch(getProductDetails(productId));
    } else {
      console.log(product);
      setName(product.name);
      setIsShow(product.isShow);
      setDescription(product.description);
      setCategory(product.category);
      setSubCategory(product.SubCategory);
      setProductSize(product.ProductSize[0].size);
      setStock(product.ProductSize[0].stock);
      setOldImages(product.images);
      setNewStock(0);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      // history.push("/admin/products");
      dispatch(getProductDetails(productId));
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("SubCategory", SubCategory);
    myForm.set("ProductSize", [ProductSize]);
    myForm.set(
      "Stock",
      parseInt(Stock) + (isNaN(newStock) ? 0 : parseInt(newStock))
    );
    myForm.set("isShow", isShow);
    console.log([ProductSize], Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
    // setProductSize(product.ProductSize[0].size);
    // setStock(product.ProductSize[0].size);
  };

  const handlesizeChange = (e) => {
    console.log(
      product.ProductSize[e.target.options.selectedIndex].size,
      e.target.options.selectedIndex
    );
    setProductSize(product.ProductSize[e.target.options.selectedIndex].size);
    setStock(e.target.value);
  };

  useEffect(() => {
    console.log(ProductSize);
  }, [ProductSize]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  console.log(ProductSize);
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        {" "}
        {/* <SideBar /> */}{" "}
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1> Update Product </h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </div>{" "}
            <div>
              <AccountTreeIcon />
              <input
                type="text"
                placeholder="Category"
                required
                disabled
                value={product.category}
                // onChange={(e) => setSubCategory(e.target.value)}
              />{" "}
            </div>{" "}
            <div>
              <FilterAltIcon />
              <input
                type="text"
                placeholder="SubCategory"
                required
                disabled
                value={product.SubCategory}
                // onChange={(e) => setSubCategory(e.target.value)}
              />{" "}
            </div>
            <div>
              <HeightIcon />{" "}
              {product && product.ProductSize && (
                <select
                  name="size"
                  id="size"
                  value={ProductSize}
                  onChange={(e) => {
                    // console.log(ProductSize);
                    // console.log(
                    //   product.ProductSize[e.target.selectedIndex].size,
                    //   e.target.selectedIndex
                    // );
                    const selectedSize =
                      product.ProductSize[e.target.selectedIndex].size;
                    const selectedStock =
                      product.ProductSize[e.target.selectedIndex].stock;
                    setProductSize(selectedSize);
                    setStock(selectedStock);
                  }}
                >
                  {/* <option value="selectsize"> Select Size </option> */}
                  {product.ProductSize.map((item) => (
                    <option key={item.size} value={item.size}>
                      {item.size}
                    </option>
                  ))}
                </select>
              )}{" "}
            </div>
            {/* <div>{ProductSize}</div> */}
            <div class="highlightdiv">
              <AddIcon />
              <div class="stockdesc"># of new stock </div>
              <input
                type="number"
                placeholder="New Stock"
                required
                onChange={(e) => {
                  setNewStock(e.target.value);
                }}
                value={newStock}
              />{" "}
            </div>
            <div>
              <StorageIcon />
              <div class="stockdesc">Total Stock</div>
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={
                  parseInt(Stock) + (isNaN(newStock) ? 0 : parseInt(newStock))
                }
              />{" "}
            </div>
            <div id="hideWrapper">
              <div id="hide"> Do you want to show this product ? </div>{" "}
              <input
                id="hideCheckbox"
                type="checkbox"
                onChange={(value) => {
                  setIsShow(value.target.checked);
                  // console.log(value.target.checked);
                }}
                checked={isShow}
              />{" "}
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {" "}
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}{" "}
            </div>
            <div id="createProductFormImage">
              {" "}
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}{" "}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Item{" "}
            </Button>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </Fragment>
  );
};

export default UpdateProduct;
