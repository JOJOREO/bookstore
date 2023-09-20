import React from "react";
import LoginPage from "./pages/loginPage";
import ListBooks from "./pages/listBooks";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListBooks />} />
          <Route path="/login" element={<LoginPage />} />
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
