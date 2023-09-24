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
export const bookSetter = (payload) => {
  return { type: "setBook", payload };
};
export const bookDelete = (payload) => {
  return { type: "deleteBook", payload };
};
export const AddToDeleteArray = (payload) => {
  return { type: "AddToDeleteArray", payload };
};
export const AddNewBook = (payload) => {
  return { type: "addNewBook", payload };
};

export const toggleEditFunction = (payload) => {
  return { type: "toggleEdit", payload };
};
export const AddToEditArray = (payload) => {
  return { type: "AddToEditArray", payload };
};
