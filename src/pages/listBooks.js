import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import { toggleSideBarFunction } from "../store/actions";
import { bookSetter } from "../store/actions";
import { bookDelete } from "../store/actions";
import { AddToDeleteArray } from "../store/actions";
import { AddNewBook } from "../store/actions";
import { toggleEditFunction } from "../store/actions";
import { AddToEditArray } from "../store/actions";

import { connect } from "react-redux";
import store from "../store/store";

import searchIcon from "../images/211818_search_icon.png";
import searchIcon2 from "../images/1814075_find_magnifier_magnifying glass_search_icon.png";
import blackEye from "../images/211661_eye_icon.png";
import blackEyeHover from "../images/211661_eye_icon_hover.png";
import editIcon from "../images/326602_create_edit_pencil_write_icon.png";
import editIconHover from "../images/326602_create_edit_pencil_write_icon (1).png";
import deleteIcon from "../images/352303_delete_icon.png";
import deleteIconHover from "../images/352303_delete_icon (1).png";

import { useNavigate } from "react-router-dom";

console.log("initial store ", store.getState());

store.subscribe(() => {
  console.log("store changed full store ==> ", store.getState());
  // console.log(
  //   "store changed single variable == >",
  //   store.getState().toggleSideBar.toggleSideBar
  // );
});
const handleSubmit = (e) => {
  e.preventDefault();
};
// useEffect(() => {
//   !store.getState().user.data.email ? navigate("/") : "";
// }, [store.getState().user.data.email]);

const url =
  "https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=" +
  "AIzaSyBqQ-1lxJPfHM-9gxOHnL9qsvlXOw7MnQM";
// const url =
//   "https://www.googleapis.com/books/v1/volumes?q=flowers&key=" +
//   "AIzaSyBqQ-1lxJPfHM-9gxOHnL9qsvlXOw7MnQM";

const ListBooks = (props) => {
  const [booksData, setBooksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [deletedBookConfirm, setDeletedBookConfirm] = useState(
    store.getState().book.deletedBookConfirm
  );

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    if (store.getState().book.deletedArray.length != 0) {
      let result = data.items.filter((book, index) => {
        if (!store.getState().book.deletedArray.includes(book.id)) return book;
      });
      console.log(store.getState().book.newBook);
      if (store.getState().book.newBook) {
        console.log(store.getState().book.newBook);
        result = result.push(store.getState().book.newBook);
        console.log("new book added");
        console.log(result);
      }

      // test
      console.log("case 1");
      if (JSON.stringify(store.getState().book.newBook) === "{}") {
        console.log("no new books to add");
      } else {
        // console.log("new book added");
        // console.log(store.getState().book.newBook);
        // console.log(data);
        if (!store.getState().book.toggleEdit) {
          data.items.push(store.getState().book.newBook);
          console.log("new book added");
          // props.toggleEditFunction(false);
        }
        // console.log(data.items);
      }

      if (store.getState().book.toggleEdit) {
        console.log("edited book ");
        console.log(store.getState().book.newBook);
        console.log(store.getState().book.newBook.id);
        data.items.filter((book, index) => {
          if (book.id === store.getState().book.newBook.id) {
            console.log("edited book found");
            console.log(
              "edited book authors",
              store.getState().book.newBook.volumeInfo.authors.toString()
            );
            // console.log("edited book found");
            data.items.splice(index, 1, store.getState().book.newBook);
            // props.toggleEditFunction(false);
            // data.items.splice(index, 0, store.getState().book.newBook);
            // return store.getState().book.newBook;
          } else return book;
        });
      }

      console.log(store.getState().book.editArray.length);

      let idsArray = [];
      for (let i = 0; i < store.getState().book.editArray.length; i++) {
        idsArray.push(store.getState().book.editArray[i].id);
      }
      console.log(idsArray);

      if (store.getState().book.editArray.length != 0) {
        // let newBooksArray = [];
        // newBooksArray = data.items.filter((book, index) => {
        data.items.filter((book, index) => {
          console.log(store.getState().book.editArray[index]);
          console.log(store.getState().book.editArray);
          // console.log(store.getState().book.editArray[index].id);
          console.log(book.id);
          // console.log(book.id === store.getState().book.editArray[index].id);
          // console.log(store.getState().book.editArray.includes(book.id));
          if (idsArray.includes(book.id)) {
            console.log(book.id);
            // return store.getState().book.editArray[index];
            for (let i = 0; i < store.getState().book.editArray.length; i++) {
              // idsArray.push(store.getState().book.editArray[i].id);
              if (store.getState().book.editArray[i].id === book.id)
                data.items.splice(index, 1, store.getState().book.editArray[i]);
            }
          }
        });
        // setBooksData({ items: newBooksArray });
        // return;
      }

      setBooksData({ items: result });
    } else {
      // console.log("else");
      // console.log(store.getState().book.newBook);
      // console.log(store.getState().book.newBook);
      // console.log(store.getState().book.newBook == {});
      // console.log(store.getState().book.newBook != {});
      // console.log(!(store.getState().book.newBook != {}));
      // console.log(JSON.stringify(store.getState().book.newBook) === "{}");
      // console.log(store.getState().book.newBook.id);
      // console.log(store.getState().book.newBook.id != undefined);
      console.log("case 2");
      if (JSON.stringify(store.getState().book.newBook) === "{}") {
        console.log("no new books to add");
      } else {
        // console.log("new book added");
        // console.log(store.getState().book.newBook);
        // console.log(data);
        if (!store.getState().book.toggleEdit) {
          data.items.push(store.getState().book.newBook);
          console.log("new book added");
        }
        // console.log(data.items);
      }

      if (store.getState().book.toggleEdit) {
        console.log("edited book ");
        console.log(store.getState().book.newBook);
        console.log(store.getState().book.newBook.id);
        data.items.filter((book, index) => {
          if (book.id === store.getState().book.newBook.id) {
            console.log("edited book found");
            console.log(
              "edited book authors",
              store.getState().book.newBook.volumeInfo.authors.toString()
            );
            // console.log("edited book found");
            // data.items.splice(index, 0);
            data.items.splice(index, 1, store.getState().book.newBook);

            props.AddToEditArray(store.getState().book.newBook);

            // data.items.splice(index, 0, store.getState().book.newBook);
            // props.toggleEditFunction(false);
            // return store.getState().book.newBook;
          } else return book;
        });
      }
      console.log(store.getState().book.editArray.length);

      let idsArray = [];
      for (let i = 0; i < store.getState().book.editArray.length; i++) {
        idsArray.push(store.getState().book.editArray[i].id);
      }
      console.log(idsArray);

      if (store.getState().book.editArray.length != 0) {
        // let newBooksArray = [];
        // newBooksArray = data.items.filter((book, index) => {
        data.items.filter((book, index) => {
          console.log(store.getState().book.editArray[index]);
          console.log(store.getState().book.editArray);
          // console.log(store.getState().book.editArray[index].id);
          console.log(book.id);
          // console.log(book.id === store.getState().book.editArray[index].id);
          // console.log(store.getState().book.editArray.includes(book.id));
          if (idsArray.includes(book.id)) {
            console.log(book.id);
            // return store.getState().book.editArray[index];
            for (let i = 0; i < store.getState().book.editArray.length; i++) {
              // idsArray.push(store.getState().book.editArray[i].id);
              if (store.getState().book.editArray[i].id === book.id)
                data.items.splice(index, 1, store.getState().book.editArray[i]);
            }
          }
        });
        // setBooksData({ items: newBooksArray });
        // return;
      }

      setBooksData(data);
      setLoading(false);
      // props.toggleEditFunction(false);
    }
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [booksData]);
  const deleteBook = async (bookId) => {
    props.AddToDeleteArray(bookId);

    // const data = await response.json();
    // setBooksData(data);
    // setLoading(false);

    // getData();
    // console.log(bookId);
    // console.log(booksData);
    // console.log(data);
    let newBooksArray = [];
    newBooksArray = booksData.items.filter((book, index) => {
      if (
        book.id !== bookId &&
        !store.getState().book.deletedArray.includes(book.id)
      ) {
        return book;
      }
    });
    setBooksData({ items: newBooksArray });
  };

  const deleteFromDetails = async (bookId) => {
    props.AddToDeleteArray(bookId);
    const response = await fetch(url);
    const data = await response.json();
    // setBooksData(data);
    // setLoading(false);

    // getData();
    // console.log(bookId);
    // console.log(booksData);
    // console.log(data);
    let newBooksArray = [];
    // newBooksArray = booksData.items.filter((book, index) => {
    newBooksArray = data.items.filter((book, index) => {
      // console.log(book);
      // console.log(book.id);
      // console.log(bookId);
      console.log(!store.getState().book.deletedArray.includes(book.id));
      if (
        book.id !== bookId ||
        !store.getState().book.deletedArray.includes(book.id)
      ) {
        console.log("normal found");
        return book;
      }
    });
    console.log({ items: newBooksArray });
    setBooksData({ items: newBooksArray });
  };

  // props.bookDelete(deleteBook);

  const [bookTitle, setBookTitle] = useState();
  const [bookCategory, setBookCategory] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [bookISBN, setBookISBN] = useState();
  const [bookVersion, setBookVersion] = useState();

  const [pageIndex, setPageIndex] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const search = () => {
    let found = false;
    if (searchWord === "") {
      alert("please enter search word");
      return;
    }
    const result = booksData.items.filter((book, index) => {
      let authors = book.volumeInfo.authors;
      // console.log(authors && authors.toString());
      if (
        book.volumeInfo.title.includes(searchWord) ||
        (book.volumeInfo.authors &&
          book.volumeInfo.authors.toString().includes(searchWord))
      ) {
        found = true;
        return book;
      }

      if (index === booksData.items.length - 1 && !found) {
        alert("no match found");

        return;
      }
    });
    // console.log("result ", result);
    // console.log("pageIndex ", pageIndex);
    setBooksData({ items: result });
    setSearchWord("");
  };

  return (
    <div
      className={
        !props.toggleSideBar.toggleSideBar
          ? "minimized-listBook"
          : "full-ListBook"
      }
    >
      {/* {console.log(props.toggleSideBar)} */}
      {/* {console.log(props)} */}
      <SideBar />
      <div className={`content`}>
        {store.getState().toggleSideBar.toggleSideBar}
        <Navbar />
        <div
          className={`books ${
            props.toggleSideBar.toggleSideBar ? "full-ListBook" : ""
          }`}
        >
          <h1>Books</h1>
          <form onSubmit={handleSubmit}>
            <div className="books-form-div">
              <div className="search-div">
                <input
                  className="form-control search-input"
                  type="text"
                  placeholder="Search"
                  value={searchWord}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="search-Button"
                  onClick={() => {
                    search();
                  }}
                >
                  <img src={searchIcon}></img>
                </button>
              </div>
              <div className="add-book-div">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/add-book");
                    props.toggleEditFunction(false);
                    // store.getState().book.toggleEdit = false;
                  }}
                >
                  + Add Book
                </button>
              </div>
            </div>
          </form>

          <div className="books-table">
            {!loading && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Book Category</th>
                    <th>Book Author</th>
                    <th>Book ISBN</th>
                    <th>Book Version</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {booksData && console.log(booksData.items)} */}

                  {booksData.items &&
                    booksData.items
                      .map((book, index) => {
                        // if (book == {}) {
                        //   console.log("empty");
                        // }
                        // console.log(book);
                        // console.log(book.volumeInfo);
                        // console.log(book.volumeInfo.title);
                        // console.log(book);
                        const id = book.id;
                        const {
                          title,
                          categories,
                          authors,
                          contentVersion,
                          imageLinks,
                          pageCount,
                          publishedDate,
                          industryIdentifiers,
                          subtitle,
                        } = book.volumeInfo;
                        // while (index <= 6)
                        return (
                          <tr key={id}>
                            <td scope="row">
                              {/* {booksData.items[index].volumeInfo.title} */}
                              {title}
                            </td>
                            <td>{categories ? categories : "Flowers"}</td>
                            <td>{authors ? authors : "unknown"}</td>
                            <td scope="row">
                              {industryIdentifiers[0].identifier}
                            </td>
                            <td>{contentVersion}</td>
                            <td>
                              <div className="icons-div">
                                <div className="lock-icon lock1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigate("/book-details");
                                      props.bookSetter(book);
                                    }}
                                  >
                                    <img
                                      src={blackEye}
                                      alt="view"
                                      className="eye-icon-normal"
                                    />
                                    <img
                                      src={blackEyeHover}
                                      alt="view"
                                      className="eye-icon-active"
                                    />
                                  </button>
                                </div>
                                <div className=" lock-icon lock2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      props.toggleEditFunction(true);
                                      props.bookSetter(book);
                                      navigate("/add-book");
                                    }}
                                  >
                                    <img
                                      src={editIcon}
                                      alt="edit"
                                      className="edit-icon-normal"
                                    />
                                    <img
                                      src={editIconHover}
                                      alt="edit"
                                      className="edit-icon-active"
                                    />
                                  </button>
                                </div>
                                <div className="lock-icon  lock3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // deleteBook(book.id);
                                      deleteBook(book.id);
                                    }}
                                  >
                                    <img
                                      src={deleteIcon}
                                      alt="delete"
                                      className="delete-icon-normal"
                                    />
                                    <img
                                      src={deleteIconHover}
                                      alt="delete"
                                      className="delete-icon-active"
                                    />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                      .filter((book, index) => {
                        if (pageIndex === 1) {
                          if (index < 6) return book;
                        } else {
                          if (index > 6) return book;
                        }
                      })}
                </tbody>
              </table>
            )}
          </div>
          {booksData.items && (
            <div className="pagination-nav" style={{ height: "10px" }}>
              <nav
                aria-label="Page navigation example"
                style={{ background: "none" }}
              >
                <ul className="pagination">
                  <li className={`page-item `}>
                    <a className="page-link" aria-label="Previous">
                      <button
                        type="button"
                        onClick={() => {
                          pageIndex > 1 ? setPageIndex(1) : "setPageIndex(2)";
                          // console.log(pageIndex);
                        }}
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      pageIndex === 1 ? "page-item active" : ""
                    }`}
                  >
                    <a className="page-link">
                      <button
                        type="button"
                        onClick={() => {
                          setPageIndex(1);
                        }}
                      >
                        1
                      </button>
                    </a>
                  </li>
                  {booksData.items.length > 6 && (
                    <li
                      className={`page-item ${
                        pageIndex === 2 ? "page-item active" : ""
                      }`}
                    >
                      <a className="page-link">
                        <button
                          type="button"
                          onClick={() => {
                            setPageIndex(2);
                          }}
                        >
                          2
                        </button>
                      </a>
                    </li>
                  )}
                  <li className="page-item">
                    <a className="page-link" aria-label="Next">
                      <button
                        type="button"
                        onClick={() => {
                          pageIndex < 2 ? setPageIndex(2) : "setPageIndex(1)";
                          // console.log(pageIndex);
                        }}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </button>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// export default ListBooks;

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
    toggleEditFunction: (toggleEdit) => {
      dispatch(toggleEditFunction(toggleEdit));
    },
    AddToEditArray: (editedBook) => {
      dispatch(AddToEditArray(editedBook));
    },
  };
};
// console.log("initial store ", store.getState());
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
