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

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState();
  // useEffect(() => {
  //   fetch(
  //     "https://gist.githubusercontent.com/LockerRoom345/8dfc7e829785d3c65e4916aca6a43ceb/raw/loginusername.json",
  //     {}
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setData(responseJson['schools']);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  console.log(typeof data);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/LockerRoom345/8dfc7e829785d3c65e4916aca6a43ceb/raw/loginusername.json",
      {}
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson["schools"]);
      })
      .catch((error) => {
        console.error(error);
      });
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated && user.role === "user") {
      history.push(redirect);
    } else if (isAuthenticated && user.role === "admin") {
      history.push("/admin/dashboard");
    } else if (isAuthenticated && user.role === "volunteer") {
      history.push("/admin/dashboard");
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
  const options = data;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="left">
              <h3>
                WELCOME <br></br>
                <h2>TO</h2>
              </h3>

              <img src={lockerroomlogo} alt="LockerRoom Logo" />
            </div>
            <div className="right">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    {/* <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p> */}
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    {/* {JSON.stringify(value)} */}
                    <Select
                      placeholder="Select School Name"
                      name="School name"
                      options={options}
                      // value={options.filter(function(option) {
                      //   return option.value === loginEmail;
                      // })}
                      onChange={handleTypeSelect}
                      label="Single select"
                      // getOptionLabel={(data) => data.label}
                      // getOptionValue={(data) => data.value}
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
                  <Link to="/loginmanual">
                    Click here if Username not found in the list
                  </Link>

                  <input type="submit" value="Login" className="loginBtn" />
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
