import React, { useEffect, useState } from "react";
import { toggleSideBarFunction } from "../store/actions";
import { connect } from "react-redux";
import { LoginUser } from "../store/actions";
import { LogoutUser } from "../store/actions";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const navigate = useNavigate();
  const [toggleDropDown, setToggleDropDown] = useState(true);
  return (
    <nav className={props.toggleSideBar ? "full-ListBook " : ""}>
      <div className="navbar-header">
        <h3>Acore admin dashboard</h3>
      </div>

      <div className="dropdown">
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            margin: "0",
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
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
