import React, { useState, useEffect, useRef } from "react";

import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import bookmarkIcon from "../images/352230_bookmark_icon.png";

import { toggleSideBarFunction } from "../store/actions";
import { bookSetter } from "../store/actions";
import { bookDelete } from "../store/actions";
import { AddToDeleteArray } from "../store/actions";
import { AddToEditArray } from "../store/actions";
import { AddNewBook } from "../store/actions";

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
  const [bookBrief, setBookBrief] = useState("");
  const [inputType, setInputType] = useState("text");
  const [uploadBookCover, setUploadBookCover] = useState();

  const [bookTitleError, setBookTitleError] = useState("");
  const [bookAuthorError, setBookAuthorError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [bookPriceError, setBookPriceError] = useState("");
  const [bookVersionError, setBookVersionError] = useState("");
  const [bookISBNError, setBookISBNError] = useState("");
  const [bookBriefError, setBookBriefError] = useState("");
  const [uploadBookCoverError, setUploadBookCoverError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (store.getState().book.toggleEdit) {
      setBookTitle(store.getState().book.book.volumeInfo.title);
      setBookAuthor(store.getState().book.book.volumeInfo.authors.toString());
      setCategories(
        store.getState().book.book.volumeInfo.categories.toString()
      );
      setBookPrice("not available");
      setBookVersion(store.getState().book.book.volumeInfo.contentVersion);
      setBookISBN(
        store.getState().book.book.volumeInfo.industryIdentifiers[0].identifier
      );
      setBookReleaseDate(store.getState().book.book.volumeInfo.publishedDate);
      setUploadBookCover(
        store.getState().book.book.volumeInfo.imageLinks.thumbnail
      );
      setBookBrief(
        store.getState().book.book.volumeInfo.subtitle
          ? store.getState().book.book.volumeInfo.subtitle
          : ""
      );
    }
  }, []);

  const handleAddBook = () => {
    const newBook = {
      id: !store.getState().book.toggleEdit
        ? bookTitle + (Math.floor(Math.random() * 600) + 1)
        : store.getState().book.book.id,
      volumeInfo: {
        authors: [bookAuthor],
        categories: [categories],
        contentVersion: bookVersion,
        imageLinks: { thumbnail: uploadBookCover },
        industryIdentifiers: [{ identifier: bookISBN }],
        pageCount: !store.getState().book.book.volumeInfo.pageCount
          ? Math.floor(Math.random() * 600) + 500
          : store.getState().book.book.volumeInfo.pageCount, //random number between 500-600 page
        title: bookTitle,
        description: bookBrief,
        publishedDate: bookReleaseDate,
      },
      saleInfo: !store.getState().book.toggleEdit
        ? { retailPrice: { amount: bookPrice } }
        : {},
    };
    console.log("newBook", newBook);
    props.AddNewBook(newBook);
    navigate("/main-page");
  };
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };
  const [file, setFile] = useState();
  const previewImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setUploadBookCover(URL.createObjectURL(e.target.files[0]));
  };

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
          <h1>{`${
            store.getState().book.toggleEdit ? "Edit Book" : "Add Book"
          }`}</h1>
          <form onSubmit={handleSubmit} className="add-book-form">
            <div className="main-div-with-book-details">
              <div className="left form-group">
                <div>
                  <input
                    onBlur={() => {
                      if (bookTitle === "") {
                        setBookTitleError(true);
                      } else {
                        setBookTitleError(false);
                      }
                    }}
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
                      setBookTitle(false);
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

                  {bookTitleError && (
                    <p className={`${bookTitle ? "invisibleSpan" : ""}`}>
                      Book title is required.
                    </p>
                  )}
                </div>
                <div>
                  <input
                    onBlur={() => {
                      if (bookAuthor === "") {
                        setBookAuthorError(true);
                      } else {
                        setBookAuthorError(false);
                      }
                    }}
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

                  {bookAuthorError && (
                    <p className={`${bookAuthor ? "invisibleSpan" : ""}`}>
                      Book Author is required.
                    </p>
                  )}
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <select
                    onBlur={() => {
                      if (categories === "") {
                        setCategoriesError(true);
                      } else {
                        setCategoriesError(false);
                      }
                    }}
                    style={{ margin: "0" }}
                    className="form-select form-control"
                    aria-label="Default select example"
                    required
                    value={categories}
                    onChange={(e) => {
                      setCategories(e.target.value);
                    }}
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

                  {categoriesError && (
                    <p className={`${categories ? "invisibleSpan" : ""}`}>
                      Categories is required.
                    </p>
                  )}
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    onBlur={() => {
                      if (bookPrice === "") {
                        setBookPriceError(true);
                      } else {
                        setBookPriceError(false);
                      }
                    }}
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

                  {bookPriceError && (
                    <p className={`${bookPrice ? "invisibleSpan" : ""}`}>
                      Book Price is required.
                    </p>
                  )}
                </div>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    onBlur={() => {
                      if (bookVersion === "") {
                        setBookVersionError(true);
                      } else {
                        setBookVersionError(false);
                      }
                    }}
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
                      color: "red",
                      position: "relative",
                      left: "95px",
                      top: "-32px",
                    }}
                  >
                    *
                  </span>

                  {bookVersionError && (
                    <p className={`${bookVersion ? "invisibleSpan" : ""}`}>
                      Book Version is required.
                    </p>
                  )}
                </div>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  value={bookOlderVersion}
                  onChange={(e) => {
                    setBookOlderVersion(e.target.value);
                  }}
                >
                  <option value={""} hidden disabled>
                    Book Older Version
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Book Edition"
                  value={bookEdition}
                  onChange={(e) => {
                    setBookEdition(e.target.value);
                  }}
                ></input>
                <div
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <input
                    onBlur={() => {
                      if (bookISBN === "") {
                        setBookISBNError(true);
                      } else {
                        setBookISBNError(false);
                      }
                    }}
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
                      left: "80px",
                      top: "-32px",
                    }}
                  >
                    *
                  </span>
                  {bookISBNError && (
                    <p className={`${bookISBN ? "invisibleSpan" : ""}`}>
                      Book ISBN is required.
                    </p>
                  )}
                </div>
                <input
                  style={{ color: "grey" }}
                  type={inputType}
                  onClick={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  placeholder="Book Release Date"
                  value={bookReleaseDate}
                  onChange={(e) => {
                    setBookReleaseDate(e.target.value);
                    console.log(bookReleaseDate);
                  }}
                ></input>
              </div>
              <div className="right">
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="img-div"
                >
                  <img
                    className="book-cover"
                    src={uploadBookCover}
                    alt={bookTitle}
                  ></img>
                  <img
                    src={bookmarkIcon}
                    style={{
                      width: "18px",
                      margin: "0",
                      padding: "0",
                      marginLeft: "20px",
                    }}
                  ></img>
                </div>
                <p style={{ color: "gray", fontSize: "10px" }}>
                  Best dimensions for book cover image are 128*200
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                    height: "fit-content",
                  }}
                >
                  <input
                    onBlur={() => {
                      if (bookISBN === "") {
                        setUploadBookCoverError(true);
                      } else {
                        setUploadBookCoverError(false);
                      }
                    }}
                    ref={fileInputRef}
                    className="custom-file-input"
                    onChange={previewImage}
                    type="file"
                  ></input>
                  <span
                    className={`${uploadBookCover ? "invisibleSpan" : ""}`}
                    style={{
                      display: "block",
                      color: "#E03FD8",
                      position: "relative",
                      top: "-42px",
                      right: "-60px",
                    }}
                  >
                    *
                  </span>
                  {uploadBookCoverError && (
                    <p
                      style={{
                        marginRight: "5px",
                      }}
                      className={`warning-p 
                      ${bookBrief ? "invisibleSpan" : ""}`}
                    >
                      Book Cover is required.
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    onBlur={() => {
                      if (bookISBN === "") {
                        setBookBriefError(true);
                      } else {
                        setBookBriefError(false);
                      }
                    }}
                    className="form-control"
                    name=""
                    id=""
                    cols="86"
                    required
                    style={{
                      resize: "none",
                      borderRadius: "5px",
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
                  {bookBriefError && (
                    <p
                      className={`warning-p 
                      ${bookBrief ? "invisibleSpan" : ""}`}
                    >
                      Book Brief is required.
                    </p>
                  )}
                  <p
                    style={{
                      color: "gray",
                      fontSize: "10px",
                      float: "right",
                      display: "inline-block",
                    }}
                  >{`${bookBrief.length}/800`}</p>
                </div>
                <div>
                  <div
                    className="book-buttons"
                    style={{
                      float: "right",
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      gridTemplateRows: "auto",
                      gridGap: "10px",
                      position: "absolute",
                      right: "40px",
                    }}
                  >
                    <div
                      className="cancel-btn-div"
                      style={{ height: "fit-content" }}
                    >
                      <button
                        type="button"
                        style={{
                          borderRadius: "5px",
                          color: "black",
                          fontWeight: "bold",
                          borderRadius: "12px",
                          padding: "10px",
                          width: "5vw",
                        }}
                        className="btn cancel-btn"
                        onClick={() => {
                          navigate("/main-page");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      style={{ height: "fit-content" }}
                      className="save-btn-div"
                    >
                      <button
                        type="button"
                        style={{
                          backgroundColor: "#0c4dcc",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          borderRadius: "12px",
                          padding: "10px",
                          width: "5vw",
                        }}
                        className="btn btn-primary save-btn"
                        onClick={handleAddBook}
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
    AddNewBook: (newBook) => {
      dispatch(AddNewBook(newBook));
    },
    AddToEditArray: (deletedBookId) => {
      dispatch(AddToEditArray(deletedBookId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
