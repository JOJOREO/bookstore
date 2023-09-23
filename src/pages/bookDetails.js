import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import libraryImage from "../images/libraryImg.png";
import { toggleSideBarFunction } from "../store/actions";
import bookmarkIcon from "../images/352230_bookmark_icon.png";
import Toast from "../components/toast";
import store from "../store/store";
const BookDetails = (props) => {
  // const book = store.getState().book;
  const [book, setBook] = useState({});
  // console.log(store.getState().book);
  // const [toggleDropDown, setToggleDropDown] = useState(true);
  const [toggleToast, setToggleToast] = useState(false);

  useEffect(() => {
    setBook(store.getState().book.book);
    // console.log(store.getState().book.book);
  }, []);
  useEffect(() => {
    setBook(store.getState().book.book);
  }, [book]);

  return (
    <div
      className={
        !props.toggleSideBar.toggleSideBar
          ? "minimized-listBook"
          : "full-ListBook"
      }
    >
      <SideBar />
      <div className="content">
        <Navbar />
        <div
          className={`books ${
            props.toggleSideBar.toggleSideBar ? "full-ListBook" : ""
          }`}
        >
          <h1 style={{ marginBottom: "15px" }}>Book Details</h1>
          <div
            style={{
              className: "main-div-with-book-details",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              height: "77vh",
              borderRadius: "32px",
              padding: "2vw",
              // marginBottom: "10px",
            }}
          >
            {/*  */}
            <div
              className="top-part"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className="book-info top-left"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  gridGap: "45px",
                  //   flexDirection: "row",
                  //   justifyContent: "space-between",
                  // border: "1px solid red",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={book?.volumeInfo?.imageLinks?.thumbnail}
                    alt={store.getState().book.book?.volumeInfo?.title}
                    style={{
                      width: "120px",
                      height: "180px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      boxShadow: " 2px 4px white, 4px 6px gray",
                      // marginBottom: "15px",
                      // paddingTop: "10px",
                    }}
                  ></img>
                  <img
                    src={bookmarkIcon}
                    style={{
                      width: "18px",
                      // height: "13px",
                      margin: "0",
                      padding: "0",
                      marginLeft: "20px",
                    }}
                  ></img>
                </div>
                <div
                  className="main-book-data"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h3 style={{ textTransform: "capitalize", marginTop: "0" }}>
                    {/* {console.log(store.getState().book)}
                    {console.log(store.getState().book.book)} */}
                    {store.getState().book.book?.volumeInfo?.title}
                    {/* dead astronauts */}
                    {/* {book.book.volumeInfo.title && book.book.volumeInfo.title} */}
                  </h3>
                  {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gridGap: "45px",
                      //   flexDirection: "row",
                      //   justifyContent: "space-between",
                      //   border: "1px solid red",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h4 style={{ color: "#2596be" }} className="number-pages">
                        {store.getState().book.book?.volumeInfo?.pageCount}
                      </h4>
                      <p style={{ color: "gray", fontSize: "10px" }}>Pages</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // border: "1px solid red",
                        // width: "100%",
                      }}
                    >
                      <h4 style={{ color: "#2596be" }} className="number-hours">
                        20h
                      </h4>
                      <p style={{ color: "gray", fontSize: "10px" }}>To read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="book-buttons top-right"
                style={{
                  // border: "1px solid purple",
                  // display: "flex",
                  // flexDirection: "row",
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  gridTemplateRows: "auto",
                  gridGap: "10px",
                  height: "20%",
                }}
              >
                <div>
                  <button
                    style={{ borderRadius: "5px", backgroundColor: "#b0011c" }}
                    className="btn btn-danger"
                    onClick={() => {
                      setToggleToast(!toggleToast);
                      console.log(toggleToast);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    style={{ backgroundColor: "#0c4dcc", borderRadius: "5px" }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            {/*  */}
            <div
              className="bottom-part"
              style={{
                display: "flex",
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "auto auto",
                gridGap: "20vw",
                // gridTemplateRows: "auto",
                // columnGap: "10 px",
                // gridGap: "5px",
                // border:"5px solid black"
                //   flexDirection: "row",
                //   justifyContent: "space-between",
                // border: "1px solid red",
              }}
            >
              <div
                className="bottom-left"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  width: "auto",
                  // border: "1px solid gold",
                }}
              >
                <p style={{ color: "gray" }}>
                  By{" "}
                  {store.getState().book.book?.volumeInfo?.authors?.toString()}{" "}
                  | {store.getState().book.book?.volumeInfo?.publishedDate}
                </p>
                <h4 style={{ color: "#2596be", marginTop: "0" }}>
                  ${" "}
                  {/* {console.log(
                    store.getState().book.book.saleInfo.listPrice.amount
                  )} */}
                  {store.getState().book.book?.saleInfo?.retailPrice &&
                    store.getState().book.book?.saleInfo?.retailPrice.amount}
                </h4>
                <p style={{ color: "gray" }}>
                  {`ISBN : ${
                    store.getState().book.book?.volumeInfo
                      ?.industryIdentifiers[0].identifier
                  }`}
                </p>
                <p style={{ color: "gray" }}>{`version : ${
                  store.getState().book.book?.volumeInfo?.contentVersion
                }`}</p>
                <button
                  style={{
                    borderRadius: "32px",
                    // height: "auto",
                    width: "fit-content",
                    color: "gray",
                  }}
                  className="btn "
                >
                  {book?.volumeInfo?.categories?.toString()}
                  {/* {store.getState().book.book?.volumeInfo.categories.toString()} */}
                </button>
              </div>
              <div
                className="bottom-right"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // border: "1px solid green",
                  maxWidth: "50vw",
                  maxHeight: "5vh",
                  // padding: "0",
                }}
              >
                <h3 style={{ textTransform: "capitalize", marginTop: "0" }}>
                  brief
                </h3>
                <p
                  style={{
                    color: "gray",
                    // border: "1px solid red",
                    overflow: "none",
                    // maxHeight: "5vh",
                    overflow: "none",
                    // maxWidth: "50vw",
                  }}
                >
                  {store.getState().book.book?.volumeInfo?.description
                    ? store
                        .getState()
                        .book.book?.volumeInfo?.description?.slice(0, 1000) +
                      "..."
                    : "-"}
                </p>
              </div>
            </div>
            {/*  */}
          </div>
          <Toast
            toggleToast={toggleToast}
            setToggleToast={setToggleToast}
          ></Toast>
        </div>
      </div>
    </div>
  );
};

// export default BookDetails;
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
  };
};
// console.log("initial store ", store.getState());
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
