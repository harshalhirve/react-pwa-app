export default {
  connection: navigator.onLine,
  cache: {
    warning: false,
    message: ""
  },
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
  },
  news: {
    sucMsg: "",
    errorCode: "",
    errorMsg: "",
    list: []
  }
};
