import React, { useState, useEffect, useRef } from "react";

import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import bookmarkIcon from "../images/352230_bookmark_icon.png";

import { toggleSideBarFunction } from "../store/actions";
import { bookSetter } from "../store/actions";
import { bookDelete } from "../store/actions";
import { AddToDeleteArray } from "../store/actions";

import { connect } from "react-redux";
import store from "../store/store";
import { useNavigate } from "react-router-dom";
const AddBook = (props) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [categories, setCategories] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookVersion, setBookVersion] = useState("");
  const [bookOlderVersion, setBookOlderVersion] = useState("");
  const [bookEdition, setBookEdition] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookReleaseDate, setBookReleaseDate] = useState("");
  const [bookCoverImage, setBookCoverImage] = useState("");
  const [bookBrief, setBookBrief] = useState("");
  const [inputType, setInputType] = useState("text");

  const [uploadBookCover, setUploadBookCover] = useState();
  const dateRef = useRef();
  const handleChange = () => {
    // console.log(dateRef);
    // console.log(dateRef.type);
    // dateRef.type = "date";
    setInputType("date");
  };
  const handleBlur = () => {
    // dateRef.type = "text";
    // console.log(dateRef);
    // console.log(dateRef.type);
    setInputType("text");
  };

  // useEffect(() => {
  //   if (!store.getState().user.data?.email) navigate("/");
  // }, [store.getState().user.data?.email]);

  return (
    <div
      className={
        !store.getState().toggleSideBar.toggleSideBar
          ? "minimized-listBook"
          : "full-ListBook"
      }
    >
      <SideBar />
      <div className="content">
        <Navbar />
        <div
          className={`books ${
            store.getState().toggleSideBar.toggleSideBar ? "full-ListBook" : ""
          }`}
        >
          <h1
          // style={{ marginBottom: "15px" }}
          >{`Add Book`}</h1>
          <form
            className="add-book-form"
            // style={{ width: "100%", backgroundColor: "purple" }}
          >
            <div
              className="main-div-with-book-details"
              style={
                {
                  // backgroundColor: "white",
                  // // display: "grid",
                  // // gridTemplateColumns: "auto auto",
                  // // gridTemplateRows: "auto",
                  // display: "flex",
                  // flexDirection: "row",
                  // alignItems: "flex-start",
                  // justifyContent: "center",
                  // height: "77vh",
                  // borderRadius: "32px",
                  // padding: "2vw",
                  // marginBottom: "10px",
                }
              }
            >
              <div
                className="left form-group"
                style={
                  {
                    // border: "1px solid red",
                    // width: "100%",
                    // height: "100%",
                    // paddingRight: "10px",
                  }
                }
              >
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    style={{ margin: "0" }}
                    type="text"
                    className={`form-control ${
                      !bookTitle ? "required invalid" : ""
                    } ${!bookTitle ? "asterisk" : ""}`}
                    placeholder={`Book title`}
                    required
                    value={bookTitle}
                    onChange={(e) => {
                      setBookTitle(e.target.value);
                    }}
                  ></input>

                  <span
                    className={`${bookTitle ? "invisibleSpan" : ""}`}
                    style={{
                      color: "red",
                      position: "relative",
                      top: "-32px",
                      right: "-75px",
                    }}
                  >
                    *
                  </span>

                  <p
                    className={`${bookTitle ? "invisibleSpan" : ""}`}
                    // className="missing-field-warning"
                    // style={{ color: "red" }}
                  >
                    Book title is required.
                  </p>
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    style={{ margin: "0" }}
                    type="text"
                    className="form-control"
                    placeholder="Book Author"
                    required
                    value={bookAuthor}
                    onChange={(e) => {
                      setBookAuthor(e.target.value);
                    }}
                  ></input>
                  <span
                    className={`${bookAuthor ? "invisibleSpan" : ""}`}
                    style={{
                      color: "red",
                      position: "relative",
                      top: "-32px",
                      right: "-95px",
                    }}
                  >
                    *
                  </span>

                  <p
                    className={`${bookAuthor ? "invisibleSpan" : ""}`}
                    // className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Book Author is required.
                  </p>
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <select
                    style={{ margin: "0" }}
                    className="form-select form-control"
                    aria-label="Default select example"
                    required
                    value={categories}
                    // defaultValue={"Categories"}
                    onChange={(e) => {
                      setCategories(e.target.value);
                    }}
                    // placeholder="Categories"
                  >
                    <option value="" hidden disabled>
                      Categories
                    </option>
                    <option value="flowers">flowers</option>
                    <option value="technology">technology</option>
                    <option value="cooking">cooking</option>
                  </select>
                  <span
                    className={`${categories ? "invisibleSpan" : ""}`}
                    style={{
                      color: "red",
                      position: "relative",
                      top: "-32px",
                      right: "-85px",
                    }}
                  >
                    *
                  </span>

                  <p
                    className={`${categories ? "invisibleSpan" : ""}`}
                    // className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Categories is required.
                  </p>
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    style={{ margin: "0" }}
                    type="text"
                    className="form-control"
                    placeholder="Book Price"
                    required
                    value={bookPrice}
                    onChange={(e) => {
                      setBookPrice(e.target.value);
                    }}
                  ></input>
                  <span
                    className={`${bookPrice ? "invisibleSpan" : ""}`}
                    style={{
                      color: "red",
                      position: "relative",
                      top: "-32px",
                      right: "-80px",
                    }}
                  >
                    *
                  </span>

                  <p
                    className={`${bookPrice ? "invisibleSpan" : ""}`}
                    // className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Book Price is required.
                  </p>
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    style={{ margin: "0" }}
                    type="text"
                    className="form-control"
                    placeholder="Book Version"
                    required
                    value={bookVersion}
                    onChange={(e) => {
                      setBookVersion(e.target.value);
                    }}
                  ></input>

                  <span
                    className={`${bookVersion ? "invisibleSpan" : ""}`}
                    style={{
                      // display: "inline",
                      color: "red",
                      position: "relative",
                      left: "95px",
                      top: "-32px",
                    }}
                  >
                    *
                  </span>

                  <p
                    className={`${bookVersion ? "invisibleSpan" : ""}`}
                    // className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Book Version is required.
                  </p>
                </div>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  value={bookOlderVersion}
                  // defaultValue={"Book Older Version"}
                  onChange={(e) => {
                    setBookOlderVersion(e.target.value);
                  }}
                  // placeholder="Categories"
                >
                  <option value={""} hidden disabled>
                    Book Older Version
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {/* {!categories && (
                  <p
                    className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Categories is required.
                  </p>
                )} */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Book Edition"
                  // required
                  value={bookEdition}
                  onChange={(e) => {
                    setBookEdition(e.target.value);
                  }}
                ></input>
                {/* {!bookEdition && (
                  <p
                    className="missing-field-warning"
                    // style={{ color: "#dc3545" }}
                  >
                    Book Edition is required.
                  </p>
                )} */}
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                    // height: "15%",
                    // display: "flex",
                    // flexDirection: "row",
                  }}
                >
                  <input
                    style={{ margin: "0" }}
                    type="text"
                    className="form-control"
                    placeholder="Book ISBN"
                    required
                    value={bookISBN}
                    onChange={(e) => {
                      setBookISBN(e.target.value);
                    }}
                  ></input>

                  <span
                    className={`${bookISBN ? "invisibleSpan" : ""}`}
                    style={{
                      display: "inline",
                      color: "red",
                      position: "relative",
                      // left: "-34vw",
                      left: "80px",
                      top: "-32px",
                    }}
                  >
                    *
                  </span>
                  <p
                    style={
                      {
                        // backgroundColor: "red",
                        // width: "100%",
                        // height: "100%",
                      }
                    }
                    // className="missing-field-warning"
                    className={`${bookISBN ? "invisibleSpan" : ""}`}
                  >
                    Book ISBN is required.
                  </p>
                </div>
                <input
                  // onFocus={handleChange}
                  style={{ color: "grey" }}
                  type={inputType}
                  onClick={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  placeholder="Book Release Date"
                  value={bookReleaseDate}
                  onChange={(e) => {
                    setBookReleaseDate(e.target.value.toString());
                    console.log(bookReleaseDate);
                  }}
                ></input>
              </div>
              <div className="right">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    // src={book?.volumeInfo?.imageLinks?.thumbnail}
                    // alt={store.getState().book.book?.volumeInfo?.title}
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
                <p style={{ color: "gray", fontSize: "10px" }}>
                  Best dimensions for book cover image are 128*200
                </p>
                <div>
                  <button
                    type="button"
                    className="btn-outline-primary btn upload-btn"
                    style={{
                      background: "none",
                      border: "2px solid #E03FD8",
                      borderRadius: "12px",
                      fontSize: "12px",
                      marginBottom: "10px",
                      color: "#E03FD8",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      padding: "10px 20px",
                      // width: "10vw",
                    }}
                  >
                    Upload Book Cover
                    <input
                      type="image"
                      placeholder="Upload Book Cover"
                      required
                      onSubmit={(e) => {
                        setBookCoverImage(e.target.value);
                      }}
                      style={{
                        visibility: "hidden",
                        display: "none",
                      }}
                    />
                  </button>
                  <span
                    className={`${uploadBookCover ? "invisibleSpan" : ""}`}
                    style={{
                      display: "block",
                      color: "#E03FD8",
                      position: "relative",
                      top: "-42px",
                      right: "-131px",
                    }}
                  >
                    *
                  </span>
                </div>
                <div
                // style={{ display: "flex", flexDirection: "column" }}
                >
                  <textarea
                    className="form-control"
                    name=""
                    id=""
                    cols="86"
                    style={{
                      resize: "none",
                      // width: "100%",
                      // padding: "15px",
                      borderRadius: "5px",
                      // paddingTop: "10px",
                      // paddingLeft: "10px",
                      backgroundColor: "#eff1fd",
                    }}
                    rows="5"
                    value={bookBrief}
                    onChange={(e) => {
                      setBookBrief(e.target.value);
                    }}
                    placeholder="Book Brief"
                  ></textarea>
                  <span
                    className={`${bookBrief ? "invisibleSpan" : ""}`}
                    style={{
                      display: "block",
                      color: "red",
                      position: "relative",
                      top: "-110px",
                      right: "-85px",
                    }}
                  >
                    *
                  </span>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "10px",
                      float: "right",
                      display: "inline-block",
                    }}
                  >{`${bookBrief.length}/800`}</p>
                </div>

                {/* <button className="btn btn-primary" type="submit">
                  Save
                </button> */}

                <div>
                  <div
                    className="book-buttons"
                    style={{
                      // border: "1px solid purple",
                      // display: "flex",
                      // flexDirection: "row",
                      float: "right",
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gridTemplateRows: "auto",
                      gridGap: "10px",
                      height: "20%",
                      position: "absolute",
                      right: "40px",
                      // right: "-226px",
                    }}
                  >
                    <div>
                      <button
                        style={{
                          borderRadius: "5px",
                          color: "black",
                          fontWeight: "bold",
                          borderRadius: "12px",
                          padding: "10px",
                          width: "5vw",
                          // backgroundColor: "#b0011c",
                        }}
                        className="btn "
                        onClick={() => {
                          // setToggleToast(!toggleToast);
                          // console.log(toggleToast);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#0c4dcc",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          borderRadius: "12px",
                          padding: "10px",
                          width: "4vw",
                          // width: "fit-contents",
                        }}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// export default AddBook;

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
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
