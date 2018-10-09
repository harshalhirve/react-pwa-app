export default {
  connection: undefined,
  loading: false,
  user: {
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    token: "",
    errorCode: "",
    errorMsg: ""
  },
  posts: {
    sucMsg: "",
    errorCode: "",
    errorMsg: "",
    list: [],
    details: {}
  }
};
