import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import "./Termsofuse.css";
import lockerroomlogo from "../../../images/lockerroomlogo.PNG";
import busbuckslogo from "../../../images/busbucks.jpg";

import Footer from "../Footer/Footer";

const Termsofuse = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     history.push("/login");
  //   }
  // }, [history, isAuthenticated]);
  return (
    <div className="containerWrapper">
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={`Terms of Use`} />
            <div className="profileContainer">
              <div className="contentWrapper">
                <h1>Terms of Use</h1>
                <div className="imageWrapper">
                  <img src={lockerroomlogo} alt="" />
                  <img src={busbuckslogo} alt="" />
                </div>
                {/* <div className="textWrapper"> */}
                <h2>Terms of Use</h2>
                <p>
                  Please read these terms of use carefully before using the
                  LockerRoom 345 website.
                  <br></br>
                  When navigating through the website, please note that:
                  <br></br>
                  <ul>
                    <li>
                      {" "}
                      You cannot request a style, color, or brand for any item
                    </li>
                    <li>
                      Merchandise icons do not accurately depict the look of
                      ordered items and are solely graphical representations
                    </li>
                    <li>
                      Items can only be ordered for the purpose of supplying
                      students and not for personal use
                    </li>
                    <li>
                      {" "}
                      Supplies are limited, amount requested is not guaranteed
                    </li>
                  </ul>
                </p>
              </div>
              <Footer></Footer>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Termsofuse;
