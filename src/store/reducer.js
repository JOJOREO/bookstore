import { combineReducers } from "redux";

const toggleSideBarReducer = (state = { toggleSideBar: false }, action) => {
  if (action.type === "toggleSideBar") {
    return { ...state, toggleSideBar: action.payload };
  } else return state;
};
// { data: { email: "", password: "" }, loginState: false }
const userReducer = (state = {}, action) => {
  console.log("payload", action.payload);
  if (action.type === "Login") {
    return [
      {
        data: {
          email: action.payload.data.email,
          password: action.payload.data.password,
        },
        // loginState: action.payload.loginState,
        loginState: true,
      },
    ];
  }
  if (action.type === "Logout") {
    return [
      {
        data: {
          email: action.payload.email,
          password: action.payload.password,
        },
        // loginState: action.payload.loginState,
        loginState: false,
      },
    ];
  } else return state;
};

const rootReducer = combineReducers({
  toggleSideBar: toggleSideBarReducer,
  user: userReducer,
});
export default rootReducer;
