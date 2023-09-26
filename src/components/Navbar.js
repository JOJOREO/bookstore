import React, { useEffect, useState } from "react";
import { toggleSideBarFunction } from "../store/actions";
import { connect } from "react-redux";
// import { connect } from "react-redux";

import { LoginUser } from "../store/actions";
import { LogoutUser } from "../store/actions";

import { useNavigate } from "react-router-dom";
import store from "../store/store";

const Navbar = (props) => {
  const navigate = useNavigate();

  // const [userEmail, setUserEmail] = useState(
  //   store.getState().user[0]?.data.email
  // );

  // useEffect(() => {
  //   if (
  //     store.getState().user[0]?.data.email == "" ||
  //     store.getState().user[0]?.data.email == undefined
  //   ) {
  //     navigate("/");
  //   }
  // }, [userEmail]);
  // useEffect(() => {
  //   console.log(store.getState().user[0].data.email);
  // }, []);
  // if (
  //   store.getState().user[0]?.data.email == "" ||
  //   store.getState().user[0]?.data.email == undefined
  // ) {
  //   navigate("/");
  // }

  // const { email, password } = props.data;/
  // console.log(props);
  // console.log(props.user[0].data.email);
  // console.log(props.toggleSideBar.toggleSideBar);
  const [toggleDropDown, setToggleDropDown] = useState(true);
  return (
    <nav className={props.toggleSideBar ? "full-ListBook " : ""}>
      <div className="navbar-header">
        <h3>Acore admin dashboard</h3>
      </div>

      {/* <div className="dropdown" style={{ height: "50vh" }}> */}
      <div className="dropdown">
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            margin: "0",
            // padding: "0",
          }}
          onClick={() => {
            setToggleDropDown(!toggleDropDown);
          }}
          className="btn"
        >
          super admin
        </button>
        <div
          className={`dropdown-menu ${toggleDropDown ? "showDropDown" : ""}`}
        >
          <ul style={{ fontSize: "small" }}>
            <li>
              {/* {props.user.data.email && <p>exist</p>} */}
              {/* {props.user ? `${props.user.data.email}` : "none"} */}

              {props.user[0] && props.user[0].loginState
                ? props.user[0].data.email
                : "Anonymous user"}
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  props.LogoutUser(props.user);
                  setToggleDropDown(!toggleDropDown);
                  navigate("/");
                }}
              >
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// export default Navbar;

const mapStateToProps = (state) => {
  return {
    toggleSideBar: state.toggleSideBar.toggleSideBar,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBarFunction: (toggleSideBar) =>
      dispatch(toggleSideBarFunction(toggleSideBar)),
    LoginUser: (user) => dispatch(LoginUser(user)),
    LogoutUser: (user) => dispatch(LogoutUser(user)),
  };
};
// console.log("initial store ", store.getState());
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
