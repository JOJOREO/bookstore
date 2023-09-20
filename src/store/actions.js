export const toggleSideBarFunction = (payload) => {
  return { type: "toggleSideBar", payload };
};
export const LoginUser = (payload) => {
  return { type: "Login", payload };
};
// export const EditUserData = (payload) => {
//   return { type: "setUserData", payload };
// };
export const LogoutUser = (payload) => {
  return { type: "Logout", payload };
};
