import { combineReducers } from "redux";

const toggleSideBarReducer = (state = { toggleSideBar: false }, action) => {
  if (action.type === "toggleSideBar") {
    return { ...state, toggleSideBar: action.payload };
  } else return state;
};
// { data: { email: "", password: "" }, loginState: false }
const userReducer = (state = {}, action) => {
  // console.log("payload", action.payload);
  if (action.type === "Login") {
    return [
      {
        // ...state,
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
        ...state,
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

const bookReducer = (
  state = {
    book: {},
    deletedBookConfirm: false,
    deletedArray: [],
    newBook: {},
    toggleEdit: false,
    editArray: [],
  },
  action
) => {
  if (action.type === "setBook") {
    return { ...state, book: action.payload };
  }
  if (action.type === "deleteBook") {
    return { ...state, deletedBookConfirm: action.payload };
  }
  if (action.type === "AddToDeleteArray") {
    return { ...state, deletedArray: [...state.deletedArray, action.payload] };
  }

  if (action.type === "addNewBook") {
    return { ...state, newBook: action.payload };
  }
  if (action.type === "toggleEdit") {
    return { ...state, toggleEdit: action.payload };
  }
  if (action.type === "AddToEditArray") {
    return { ...state, editArray: [...state.editArray, action.payload] };
  } else return state;
};

const rootReducer = combineReducers({
  toggleSideBar: toggleSideBarReducer,
  user: userReducer,
  book: bookReducer,
});
export default rootReducer;
