import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import lockerroomlogo from "../../images/lockerroomlogo.PNG";
import Select from "react-select";
import { getAllUsersWithoutAuth } from "../../actions/userAction";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  let [loginPassword, setLoginPassword] = useState("");

  const [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userinfo;
  const [value, setValue] = React.useState("");

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserinfo({ ...userinfo, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/home";

  let userJsonListObject = [];
  const { users } = useSelector((state) => state.allUsers);
  // console.log(users);
  const hiddenLoginValues = [
    "admin",
    "TEST USER",
    "TEST ADMIN",
    "TEST VOLUNTEER",
    "lockerroom345",
    "volunteer",
  ];
  for (let i = 0; i < users.length; i++) {
    let email_value = users[i].email;
    let name_label = users[i].name;
    if (hiddenLoginValues.includes(email_value) == false) {
      const object = { value: email_value, label: name_label };
      userJsonListObject.push(object);
    }
    // console.log(email_value,name_label);
  }
  // console.log("array", userJsonListObject);
  // options = userJsonListObject;
  userJsonListObject.sort((a, b) => {
    let fa = a.label.toLowerCase(),
      fb = b.label.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  // console.log("SORTED", userJsonListObject);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllUsersWithoutAuth());
    setData(userJsonListObject);
    // fetch(
    //   "https://gist.githubusercontent.com/LockerRoom345/8dfc7e829785d3c65e4916aca6a43ceb/raw/loginusername.json",
    //   {}
    // )
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setData(responseJson["schools"]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    // console.log(data);
    if (isAuthenticated && user.role === "user") {
      history.push(redirect);
    } else if (isAuthenticated && user.role === "admin") {
      history.push("/admin/dashboard");
    } else if (isAuthenticated && user.role === "volunteer") {
      history.push("/admin/dashboard");
    } else {
      console.log("reset");
      setLoginPassword("");
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const handleTypeSelect = (e) => {
    setLoginEmail(e.value);
  };

return (
  <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="LoginSignUpContainer">
          {/* Announcement Container */}
          <div className="announcementContainer">
  <p style={{ fontWeight: 'bold', fontSize: '24px' }}>
     <span style={{ color: 'red' }}>The Locker Room 345 is open. 
         Pick up as usual:
TUESDAY:     2:00 - 4:00PM 
THURSDAY:  8:00 - 9:30 AM
</span>  <span style={{ color: 'red' }}></span>.
    <br />
    Kim
  </p>
</div>




          {/* Left content */}
          <div className="left">
            <h3>
              WELCOME <br />
              TO <Link to="/loginmanual"></Link>
            </h3>
            <div>
              <img src={lockerroomlogo} alt="LockerRoom Logo" />
              <Link to="/loginmanual">BUTTON</Link>
            </div>
          </div>

          {/* Right content */}
          <div className="right">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  {/* <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p> */}
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="mobileView">
                  <h3>
                    WELCOME <br />
                    TO <Link to="/loginmanual"></Link>
                  </h3>
                  <div>
                    <img src={lockerroomlogo} alt="LockerRoom Logo" />
                    <Link to="/loginmanual">BUTTON</Link>
                  </div>
                </div>
                <div className="loginEmail">
                  <Select
                    placeholder="Select School Name"
                    name="School name"
                    options={userJsonListObject}
                    onChange={handleTypeSelect}
                    label="Single select"
                    maxMenuHeight={130}
                    getOptionLabel={(e) => e.label.toUpperCase()}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="BEDS code"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Submit" className="loginBtn" />
              </form>
            </div>
          </div>
        </div>
        <div className="newfooter">
          <p>&copy; All rights reserved to Locker Room 345 </p>
        </div>
      </Fragment>
    )}
  </Fragment>
);

  
};

export default LoginSignUp;
