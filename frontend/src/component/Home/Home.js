import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Donate from "../donate/Donate";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Footer from "../../component/layout/Footer/Footer";


const Home = ({ history }) => {
  const categories = ["All", "Clothing", "Footwear", "Sports", "Miscellaneous"];

  const alert = useAlert();
  const dispatch = useDispatch();
  const [termsAccepted, setTermsAccepted] = useState(() => {
    const accepted = sessionStorage.getItem('termsAccepted');
    const timestamp = sessionStorage.getItem('termsAcceptedTime');
    const now = Date.now();
    
    if (accepted && timestamp && (now - parseInt(timestamp)) < 30 * 60 * 1000) {
      return true;
    }
    return false;
  });
  // const { loading, error, products } = useSelector((state) => state.products);
  // let hashmap = {}
  // let mapping = {}
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rows, setRows] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [keyword, setKeyword] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => {
    const showProductList = state.products.products.filter(
      (product) => product.isShow == true
    );
    const mapping = showProductList.reduce((acc, x) => {
      let subcategoryData = x.ProductSize.map((y) => {
        let obj = {};
        obj.size = y.size;
        obj.url = x.images[0].url;
        obj.stock = y.stock;
        obj._id = x._id;
        return obj;
      });
      if (acc[x.name]) {
        return {
          ...acc,
          [x.name]: {
            ...acc[x.name],
            hashmap: {
              ...acc[x.name].hashmap,
              [x.SubCategory]: subcategoryData,
            },
          },
        };
      } else {
        return {
          ...acc,
          [x.name]: {
            id: x._id,
            name: x.name,
            url: x.images[0].url,
            hashmap: {
              [x.SubCategory]: subcategoryData,
            },
          },
        };
      }
    }, {});
    return { ...state.products, products: mapping };
  });
  // const keyword = match.params.keyword;
  console.log(products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = products.length;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, currentPage, category, error, alert]);

  const searchSubmitHandler = (e) => {
    console.log(products);
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  // console.log("CHECK");
  // console.log(count, resultPerPage);
  // console.log(products);

  return (
    <Fragment>
      {!termsAccepted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>IMPORTANT: PLEASE READ:</h2>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
              <h3 style={{ marginTop: '15px', marginBottom: '10px' }}>Important Update on Clothing Requests</h3>
              <p>We are currently experiencing a high volume of large clothing requests from individuals. Please remember that we are intended to be a source of last resort—an emergency resource to turn to only when all other options have been explored. We cannot supply 20-30 items to one individual, or items such as snow pants etc in Oct, before the weather turns.</p>
              <p>There are many winter coat drives happening right now, and we strongly encourage you to explore those resources before submitting requests to us.</p>
              <p>With winter approaching, we know there will be true emergency cases—and we want to be available for those. However, at the current pace, our inventory will not last.</p>
              
              <h3 style={{ marginTop: '15px', marginBottom: '10px' }}>Please note the following:</h3>
              <ul style={{ marginLeft: '20px' }}>
                <li>Do not request more than 2–3 of any one item. Large quantity requests are very difficult for us to fulfill.</li>
                <li>Please prioritize requests. Refrain from asking for "some of everything" on the list.</li>
                <li>While it may appear we have a wide selection, often we have large quantities of the same item (e.g., same size, same color).</li>
              </ul>

              <h3 style={{ marginTop: '15px', marginBottom: '10px' }}>Our current excessive stock includes:</h3>
              <ul style={{ marginLeft: '20px' }}>
                <li>Kids' sneakers (sizes 13–6)</li>
                <li>Women's winter boots sizes (6-10)</li>
                <li>Kids' boots (70% are girls' styles, sizes toddler 8 to kids 3)</li>
                <li>All other items are very limited.</li>
              </ul>

              <p style={{ marginTop: '15px' }}>Finally, if the request is truly for an emergency, please ensure the items are picked up promptly—ideally at the very next available pickup time. We frequently see items sit for weeks, which contradicts the idea of an "emergency" need.</p>
              <p>We are doing our very best with limited access to goods and appreciate your understanding.</p>
              <p>For any questions, feel free to email us, and use the comments section on the request form to note any extenuating circumstances.</p>
              <p style={{ fontWeight: 'bold' }}>Thank you.</p>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  sessionStorage.setItem('termsAccepted', 'true');
                  sessionStorage.setItem('termsAcceptedTime', Date.now().toString());
                  setTermsAccepted(true);
                }}
                style={{
                  padding: '10px 30px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                I Understand & Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="LR345" />
          <div className="banner">
            <p>LOCKER ROOM 345</p>
            <h1>EQUIPPING STUDENTS FOR SUCCESS</h1>

            {/* <div className="bground">
            <div className="banner">
               <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a> 
            </div>
            <div className="banner1"></div>
      </div> */}
          </div>

          <div className="searchbar">
            <form className="searchBoxbar" onSubmit={searchSubmitHandler}>
              <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <div className="filterBoxhome">
            <div className="filCategorieshome">
              <fieldset>
                <Typography component="legend">Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>
          </div>
          <h2 className="homeHeading">All Products</h2>
          <h3 className="noteText">
            *Images are the graphical representation of the product. Brands of
            specific designs can not be requested
              <br />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
              <a 
                href="/sizeguide.jpg"
                download 
                className="button"
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}
              >
                Size Guide
              </a>
              <a 
                href="/footmeasure.jpg"  
                download 
                className="button"
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}
              >
                Foot Measure
              </a>
            </div>
            <div style={{ marginTop: '8px', fontSize: '18px', color: 'red', fontWeight: 'bold' }}>
              Please check the size guides before placing an order
            </div>
          </h3>
              
          <div className="container" id="container">
            {[...Object.entries(products)]

              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([key, value]) => {
                return <ProductCard key={value.id} product={value} />;
              })}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                // nextPageText="Next"
                // prevPageText="Prev"
                // firstPageText="1st"
                // lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          {/* <h2 className="homeHeading">Donation Requests</h2>
          <Donate /> */}
        </Fragment>
      )}
      <Footer></Footer>
    </Fragment>
  );
};

export default Home;
