import React from "react";
import LoginPage from "./pages/loginPage";
import ListBooks from "./pages/listBooks";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import BookDetails from "./pages/bookDetails";
import AddBook from "./pages/addBook";
function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main-page" element={<ListBooks />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </BrowserRouter>

      {/* <LoginPage /> */}
      {/* <section className="container ">
        <LoginPage />
      </section> */}
    </main>
  );
}

export default App;
