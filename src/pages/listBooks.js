import React, { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import { toggleSideBarFunction } from "../store/actions";
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
console.log("initial store ", store.getState());

store.subscribe(() => {
  console.log("store changed full store ==> ", store.getState());
  console.log(
    "store changed single variable == >",
    store.getState().toggleSideBar.toggleSideBar
  );
});
const handleSubmit = (e) => {
  e.preventDefault();
};

const url =
  "https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=" +
  "AIzaSyBqQ-1lxJPfHM-9gxOHnL9qsvlXOw7MnQM";

const ListBooks = (props) => {
  const [booksData, setBooksData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setBooksData(data);
      setLoading(false);
    };
    getData();
  }, []);

  const [bookTitle, setBookTitle] = useState();
  const [bookCategory, setBookCategory] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [bookISBN, setBookISBN] = useState();
  const [bookVersion, setBookVersion] = useState();

  const [pageIndex, setPageIndex] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  const search = () => {
    let found = false;
    let foundArr = [];
    if (searchWord === "") {
      alert("please enter search word");
      return;
    }
    const result = booksData.items.filter((book, index) => {
      let authors = book.volumeInfo.authors;
      console.log(authors && authors.toString());
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
    console.log("result ", result);
    console.log("pageIndex ", pageIndex);
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
      {console.log(props.toggleSideBar)}
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
                <button type="button" className="btn btn-primary">
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
                  {booksData && console.log(booksData.items)}

                  {booksData.items &&
                    booksData.items
                      .map((book, index) => {
                        console.log(book);
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
                                  <button type="button">
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
                                  <button type="button">
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
                                  <button type="button">
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
          <div className="pagination-nav">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item `}>
                  <a className="page-link" aria-label="Previous">
                    <button
                      type="button"
                      onClick={() => {
                        pageIndex > 1 ? setPageIndex(1) : "setPageIndex(2)";
                        console.log(pageIndex);
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
                <li className="page-item">
                  <a className="page-link" aria-label="Next">
                    <button
                      type="button"
                      onClick={() => {
                        pageIndex < 2 ? setPageIndex(2) : "setPageIndex(1)";
                        console.log(pageIndex);
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
export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
