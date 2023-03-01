import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import "./Privacypolicy.css";
import lockerroomlogo from "../../../images/lockerroomlogo.PNG";
import busbuckslogo from "../../../images/busbucks.jpg";

import Footer from "../Footer/Footer";

const Privacypolicy = ({ history }) => {
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
            <MetaData title={`Privacy Policy`} />
            <div className="profileContainer">
              <div className="contentWrapper">
                <h1>Privacy Policy</h1>
                <div className="imageWrapper">
                  <img src={lockerroomlogo} alt="" />
                  <img src={busbuckslogo} alt="" />
                </div>
                {/* <div className="textWrapper"> */}
                <h2>Our Privacy Policy</h2>
                <p>
                  We process information regarding school name, school address,
                  and contact phone number solely to provide donations. All
                  information disclosed in the checkout process will only be
                  used for distribution within schools including teacher name
                  and student ID, used to identify the receiver of the donation
                  once the package is provided to the school. Information based
                  on age and gender allows volunteers to select items available
                  for the student. The only information reserved on our end is
                  the school name and address.
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

export default Privacypolicy;
