import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import ReactTooltip from "react-tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { updateProduct } from "../../actions/productAction";

let counter = 0;
const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  let { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  if (products == undefined) products = [];

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const submit = (params) => {
    confirmAlert({
      title: "Delete Item",
      message: "Are you sure you want to delete this item from inventory",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProductHandler(params.getValue(params.id, "id")),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  // const updateProductSubmitHandler = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("name", name);
  //   myForm.set("description", description);
  //   myForm.set("category", category);
  //   myForm.set("SubCategory", SubCategory);
  //   myForm.set("ProductSize", [ProductSize]);
  //   myForm.set("Stock", Stock);
  //   myForm.set("isShow", true);

  //   images.forEach((image) => {
  //     myForm.append("images", image);
  //   });
  //   dispatch(updateProduct(productId, myForm));
  // };

  const columns = [
    // { field: "id", headerName: "Product ID", Width: 100, flex: 0.2 },
    {
      field: "show",
      headerName: "Status",
      minWidth: 20,
      flex: 0.07,
      cellClassName: (params) => {
        //console.log("params",params);
        return params.getValue(params.id, "show") == "SHOW"
          ? "greenColor"
          : "redColor";
      },
      // renderCell: (params) => {
      //   return (
      //     <Fragment>
      //       <div
      //         style={{
      //           color: params.getValue(params.id, "isShow")
      //             ? "greenColor"
      //             : "redColor",
      //         }}
      //       >
      //         {params.getValue(params.id, "isShow") ? "SHOW" : "HIDDEN"}{" "}
      //       </div>
      //     </Fragment>
      //   );
      // },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 70,
      flex: 0.1,
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      minWidth: 70,
      flex: 0.1,
    },
    // {
    //   field: "size",
    //   headerName: "Size",
    //   minWidth: 50,
    //   flex: 0.1,
    // },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 50,
      flex: 0.1,
      cellClassName: (params) => {
        //console.log("params",params);
        return params.getValue(params.id, "stock") > 0
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "stockinfo",
      headerName: "Stock by Size",
      minWidth: 50,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Fragment>
            <div
              data-tip={params.getValue(params.id, "stockinfo")}
              data-for="toolTip1"
              data-place="bottom"
              data-type="success"
              data-multiline="true"
            >
              <InfoIcon />
            </div>
            <ReactTooltip id="toolTip1" />
          </Fragment>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              {/* <EditIcon /> */}
              <span>Edit</span>
            </Link>

            <Button
              onClick={() =>
                // deleteProductHandler(params.getValue(params.id, "id"))
                submit(params)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  //const dummy = [];
  // products.forEach((x) => {
  //   dummy.push(x);
  //console.log(products);
  // });
  //  dummy[0].ProductSize[0].map((x) => {
  //console.log(products && products[0].ProductSize && products[0].ProductSize.map((x) => x.stock));
  // for (let i = 0; i < products.length; i++) {
  //   //console.log(products && products[i].ProductSize && products[i].ProductSize.map((x) => x.stock));
  //   console.log(
  //     products &&
  //       products[i].ProductSize &&
  //       products[i].ProductSize.reduce((prev, curr) =>
  //          prev.stock < curr.stock ? prev.stock : curr.stock
  //       )
  //   );
  // }
  let hashmap = new Map();
  let mapping = new Map();
  // let obj = {};

  // let stockarray = products.map((x) => {
  //   let arr = [];
  //   x.ProductSize.map((y) => {
  //     obj.size = y.size;
  //     obj.stock = y.stock;
  //     arr.push(obj);
  //   });
  //   hashmap.set(x.SubCategory, arr);
  //   mapping.set(x.name,   hashmap);
  // });

  let stockarray = products.map((x) => {
    let arr = [];
    x.ProductSize.map((y) => {
      let obj = {};
      obj.size = y.size;
      obj.stock = y.stock;
      arr.push(obj);
    });
    hashmap.set(x.SubCategory, arr);
    mapping.set(x.name, hashmap);
  });

  //let hash1 = mapping.get("Sweat Shirts");
  //console.log(mapping);
  //  for(let i=0; i<mapping.size; i++){
  //   console.log(mapping.keys);
  //  }

  // console.log([...mapping].filter((values, keys) => {
  //   values.forEach((k,v)=>k);
  //   // if(keys === "Sweat Shirts"){
  //   //   console.log(keys);
  //   // }
  // }));
  // .map(([k]) => k)

  // mapping.forEach((k) => {
  //   if (k.get("Mens sizing")) {
  //     k.get("Mens sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Womens sizing")) {
  //     k.get("Womens sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Boys' sizing")) {
  //     k.get("Boys' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else if (k.get("Girls' sizing")) {
  //     k.get("Girls' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   } else {
  //     k.get("Toddler' sizing").map((y) => console.log(y.size + ":" + y.stock));
  //   }
  // });

  //Object.entries(hash1).forEach((k,v) => console.log(v));
  // hash1.((x) => {
  //   console.log(x);
  //   if (k === "Mens sizing") {
  //     console.log(v);
  //   } else if (k === "Womens sizing") {
  //     console.log(v);
  //   } else if (k === "Boys' sizing") {
  //     console.log(v);
  //   } else if (k === "Girls' sizing") {
  //     console.log(v);
  //   } else {
  //     console.log(v);
  //   }
  // });
  // mapping.forEach((x) => {
  //   console.log(x);
  //   // if (x.name === "sweat shirts") {
  //   //   console.log( x.get("Mens sizing"));
  //   // }
  // });

  // console.log("out of stock list", map.get("Sweat Shirts").map((x) => {
  //   return x
  // }));

  //   });
  //  dummy[0].ProductSize.reduce(function(prev, curr) {
  //    console.log(prev.stock < curr.stock ? prev : curr);
  //  });
  //console.log(Object.keys(products.ProductSize[0]).sort((a,b) => (products.ProductSize[a] - products.ProductSize[b])));

  // let array1 = [];
  // products &&
  // products.forEach((item) => {
  //   console.log(item.name)
  //   item.ProductSize.map((y) => {  (y.size +":" + y.stock)  })
  // });

  products &&
    products.forEach((item) => {
      //console.log(item);
      rows.push({
        id: item._id,
        stock: item.ProductSize.reduce(
          (sum, a) => Number(sum) + Number(a.stock),
          0
        ),
        // price: item.price,
        stockinfo: item.ProductSize.map((y) => {
          let str = "";
          str += " " + y.size + " : " + y.stock + " ";
          return str;
        }),
        show: item.isShow ? "SHOW" : "HIDDEN",
        name: item.name,
        size: item.Size,
        category: item.category,
        subcategory: item.SubCategory,
      });

      //-----------------------------------
      // if (item._id == "61fd955ae97a443c34262fe3" && counter == 0) {
      //   counter = counter + 1;
      //   console.log("EXPERIMENTAL SCRIPT: ", item.name, counter);
      //   const myForm = new FormData();

      //   myForm.set("name", item.name);
      //   myForm.set("description", item.description);
      //   myForm.set("category", item.category);
      //   myForm.set("SubCategory", item.SubCategory);
      //   myForm.set("ProductSize", item.ProductSize);
      //   myForm.set("Stock", item.Stock);
      //   myForm.set("isShow", true);

      //   item.images.forEach((image) => {
      //     myForm.append("images", image);
      //   });

      //   //     var obj = new Object();
      //   //     obj.name = item.name;
      //   //     obj.description = item.description;
      //   //     obj.category = item.category;
      //   //     obj.SubCategory = item.SubCategory;
      //   //     obj.ProductSize = item.ProductSize;
      //   //     obj.Stock = item.Stock;
      //   //     obj.isShow = true;
      //   //     item.images.forEach((image) => {
      //   //       obj.images = image;
      //   //     });
      //   // // obj.images = images;
      //   // var jsonString = obj;
      //   dispatch(updateProduct(item._id, myForm));
      // }

      //-----------------------------------
    });

  return (
    <Fragment>
      <MetaData title={`ALL Items Available - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
