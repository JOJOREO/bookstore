import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import store from "../store/store";
import { AddToDeleteArray } from "../store/actions";
import { bookDelete } from "../store/actions";
import { toggleSideBarFunction } from "../store/actions";
import { bookSetter } from "../store/actions";
import { redirect } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Toast = (props) => {
  const [open, setOpen] = React.useState(false);
  // console.log("");
  const navigate = useNavigate();
  const handleClickToOpen = () => {
    setOpen(true);
  };
  //   if (props.toggleToast) {
  //     handleClickToOpen();
  //   }
  useEffect(() => {
    // console.log("inside toast", props.toggleToast);
    // props.toggleToast ? handleClickToOpen() : "";
    if (props.toggleToast) {
      handleClickToOpen();
    }
    // props.setToggleToast(!props.toggleToast);

    // console.log("open", open);
  }, [props.toggleToast]);
  useEffect(() => {
    // console.log("open", open);
  }, [open]);

  const handleToClose = () => {
    setOpen(false);
    props.setToggleToast(!props.toggleToast);
  };
  return (
    <div style={{}}>
      {/* <h4>How to create Dialog Box in ReactJS?</h4> */}
      {/* <Button variant="outlined" color="primary" onClick={handleClickToOpen}>
        Open Demo Dialog
      </Button> */}
      {/* {props.toggleToast ? handleClickToOpen : handleToClose} */}
      <Dialog
        open={open}
        onClose={handleToClose}
        // style={{ width: "100%", maxWidth: "500px" }}
        PaperProps={{
          //   sx: { width: "100%", maxWidth: "720px" },
          style: { width: "35vw", paddingBottom: "10px" },
        }}
      >
        <DialogTitle>
          {<h4 style={{ fontWeight: "bold", color: "gray" }}>Delete Book</h4>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h5 style={{ margin: "0" }}>
              Are you sure you want to delete this Book?
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ height: "8vh" }}>
          <Button
            className="btn"
            onClick={handleToClose}
            color="primary"
            // autoFocus
            style={{
              height: "100%",
              width: "auto",
              backgroundColor: "#f0f0f0",
              color: "black",
              height: "100%",
              width: "5vw",
              fontSize: "10px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              props.toastCallback(true);
              // console.log(props.bookDelete);
              // console.log(store.getState().book.deletedBookConfirm);
              console.log(store.getState().book.book.id);
              props.bookDelete(true);
              props.AddToDeleteArray(store.getState().book.book.id);
              // console.log(
              //   "delete book confirm",
              //   store.getState().book.deletedBookConfirm
              // );

              // console.log("deleted array", store.getState().book.deletedArray);
              handleToClose();
              navigate("/main-page");

              // store.getState().book.deleteFnc(store.getState().book.book.id);
              // console.log(store.getState());
            }}
            color="primary"
            style={{
              height: "100%",
              width: "5vw",
              fontSize: "10px",
              borderRadius: "12px",
              fontWeight: "bold",
              backgroundColor: "rgb(176, 1, 28)",
              color: "white",
            }}
            // autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// export default Toast;

const mapStateToProps = (state) => {
  return {
    toggleSideBar: state.toggleSideBar,
    user: state.user,
    book: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideBarFunction: (toggleSideBar) =>
      dispatch(toggleSideBarFunction(toggleSideBar)),
    bookSetter: (book) => {
      dispatch(bookSetter(book));
    },
    bookDelete: (deletedBookConfirm) => {
      dispatch(bookDelete(deletedBookConfirm));
    },
    AddToDeleteArray: (deletedBookId) => {
      dispatch(AddToDeleteArray(deletedBookId));
    },
  };
};
// console.log("initial store ", store.getState());
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
