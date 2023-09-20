import React from "react";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import { toggleSideBarFunction } from "../store/actions";
import { connect } from "react-redux";
import store from "../store/store";
import searchIcon from "../images/211818_search_icon.png";
import searchIcon2 from "../images/1814075_find_magnifier_magnifying glass_search_icon.png";

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

const ListBooks = (props) => {
  // const { toggleSideBar } = store.getState().toggleSideBar.toggleSideBar;
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
      <div
        // className={`content ${
        //   props.toggleSideBar.toggleSideBar ? "full-ListBook" : ""
        // }`}
        className={`content`}
      >
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
                />
                <button type="button" className="search-Button">
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
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Book Title</th>
                  <th style={{ width: "15%" }}>Book Category</th>
                  <th style={{ width: "15%" }}>Book Author</th>
                  <th style={{ width: "15%" }}>Book ISBN</th>
                  <th style={{ width: "15%" }}>Book Version</th>
                  <th
                    style={{
                      width: "25%",
                      textAlign: "end",
                      paddingRight: "20px",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination-nav">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#!" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#!">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#!">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#!">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#!" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
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
