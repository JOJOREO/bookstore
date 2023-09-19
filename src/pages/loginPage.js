import React, { useState } from "react";
// import { libraryImage } from "./libraryImg.png";
import libraryImage from "../images/libraryImg.png";
import logoIMg from "../images/acore-logo-2.png.webp";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //optional , not used (splitting used logged in or not into separate state )
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    data: { email: "", password: "" },
    loginState: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ data: { email: email, password: password }, loginState: true });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card">
      <div className="form-div">
        <h3 style={{ width: "100%", margin: "5% 5% 5% 0" }}>
          Please enter your email address and password to access your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="EmailAddress"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <div className="password-div">
              <input
                type={!showPassword ? "password" : "text"}
                className="form-control"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="showPass"
              >
                show
              </button>
            </div>
          </div>
          <a style={{ display: "block", margin: "4% 0 " }}>Forgot Password?</a>
          <button
            onClick={(e) => {}}
            style={{
              width: "9vw",
              height: "3vw",
              borderRadius: "12px",
              backgroundColor: "#0a4cd3",
            }}
            className="btn btn-primary submitButton"
          >
            Sign In
          </button>
          <hr style={{ width: "100%" }} />
          <img className="logo" src={logoIMg}></img>
        </form>
      </div>

      <div className="img-container">
        <img className="img" src={libraryImage} alt="library Image"></img>
      </div>
    </div>
  );
};

export default LoginPage;
