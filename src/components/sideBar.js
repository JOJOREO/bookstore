import React, { useEffect, useRef, useState } from "react";
// import backIcon from "../images/back.png";
import backIcon from "../images/2849832_arrows_navigation_arrow_left_back_icon.png";
import forwardIcon from "../images/2849833_arrows_navigation_forward_arrow_right_icon.png";
import logo from "../images/acore-logo-2.png.webp";
import filesIcon from "../images/paperwork.png";

import { toggleSideBarFunction } from "../store/actions";
import store from "../store/store";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
const SideBar = (props) => {
  const navigate = useNavigate();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const sidebarRef = useRef();
  // useEffect(() => {
  //   sidebarRef.current.getBoundingClientRect();
  // }, [toggleSideBar]);
  return (
    <aside ref={sidebarRef} className={!toggleSideBar ? "show-sidebar" : ""}>
      <div className="sidebar-Header">
        <button
          style={{
            border: "none",
            background: "none",
            margin: "0",
            padding: "0",
          }}
          onClick={() => {
            navigate("/main-page");
          }}
        >
          <img className="logo" src={logo}></img>
        </button>
        <button
          onClick={() => {
            setToggleSideBar(!toggleSideBar);
            props.toggleSideBarFunction(!toggleSideBar);
            // store.dispatch({ type: "toggleSideBar", payload: !toggleSideBar });
            // console.log(toggleSideBar);
            // console.log("store changed", store.getState());
          }}
          style={{ border: "none", background: "none" }}
        >
          <img
            src={!toggleSideBar ? backIcon : forwardIcon}
            style={{ height: "15px" }}
          ></img>
        </button>
      </div>

      <div className="sidebar-tabs ">
        <div className={`tab ${!toggleSideBar ? "active-tab" : ""}`}>
          <img style={{ height: "20px" }} src={filesIcon}></img>
          <h5 style={{ marginLeft: "30px", fontWeight: "bold" }}>Books</h5>
          {/* <div className="colored-edge"></div> */}
        </div>
      </div>
    </aside>
  );
};

// export default SideBar;

const mapStateToProps = (state) => {
  return {
    toggleSideBar: state.toggleSideBar,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBarFunction: (toggleSideBar) =>
      dispatch(toggleSideBarFunction(toggleSideBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
