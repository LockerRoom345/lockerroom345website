import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmailIcon from "@material-ui/icons/Email";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [receivingPersonName, setreceivingPersonName] = useState("");
  const [receivingPersonAge, setreceivingPersonAge] = useState("");
  const [receivingPersonGender, setreceivingPersonGender] = useState("");
  const [gender, setGender] = useState("");

  const [userLoggedInDesignation, setuserLoggedInDesignation] = useState("");
  // const [address, setAddress] = useState(shippingInfo.address);
  // const [city, setCity] = useState(shippingInfo.city);
  // const [state, setState] = useState(shippingInfo.state);
  // const [country, setCountry] = useState(shippingInfo.country);
  // const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [Email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [addComments, setaddComments] = useState("");
  const regex = /\w+-\d{1,2}/;
  let orderDate = "";
  const shippingSubmit = (e) => {
    if (gender == "") {
      e.preventDefault();
      alert.error("Please select a gender", {
        timeout: 4000,
      });
    } else {
      const studentString =
        receivingPersonName + "_" + receivingPersonAge + "_" + gender;
      e.preventDefault();
      let current = new Date();
      let cDate =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      let cTime =
        current.getHours().toString().padStart(2, 0) +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      let orderDate = cDate + " " + cTime;

      // if (phoneNo.length < 10 || phoneNo.length > 10) {
      //   alert.error("Phone Number should be 10 digits Long");
      //   return;
      // }
      dispatch(
        saveShippingInfo({
          userName: user.name,
          receivingPersonName: studentString,
          additionalComments: addComments,
          userLoggedInDesignation,
          userAddress: user.address + "|" + user.district,
          orderDate,
          phoneNo,
          Email,
        })
      );
      history.push("/order/confirm");
    }
  };

  return (
    <Fragment>
      <MetaData title="Delivery Details" />
      

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Delivery Details</h2>
          <h2 className="shippingHeading">Please make sure the student ID you input is unidentifying</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <ApartmentIcon />
              <p> {user.name}</p>
              <input
                type="text"
                placeholder="Teacher's Name"
                value={userLoggedInDesignation}
                onChange={(e) => setuserLoggedInDesignation(e.target.value)}
              />
            </div>
            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Receiving Student ID"
                value={receivingPersonName}
                required={true}
                onChange={(e) => setreceivingPersonName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Receiving Student Age"
                value={receivingPersonAge}
                required={true}
                onChange={(e) => setreceivingPersonAge(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required={true}
              >
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="NA">Preder not to say</option>
              </select>
            </div>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                value={user.address}
                disabled
                // onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="District"
                value={user.district}
                disabled
                // onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="text"
                placeholder="Email"
                value={Email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="additionalComments">
              <textarea
                placeholder="Add if you have any additional comments or request for items here..."
                onChange={(e) => setaddComments(e.target.value)}
              >
                {addComments}
              </textarea>
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              // disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
