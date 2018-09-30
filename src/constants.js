const defaultProps = {
  USER_SESSION: "user"
};
module.exports = defaultProps;
switch (process.env.NODE_ENV) {
  case "development":
    module.exports = Object.assign(defaultProps, {
      USER_API_BASE_URL: "https://reqres.in",
      POST_API_BASE_URL: "https://jsonplaceholder.typicode.com"
    });
    break;
  case "production":
    module.exports = Object.assign(defaultProps, {
      USER_API_BASE_URL: "https://reqres.in",
      POST_API_BASE_URL: "https://jsonplaceholder.typicode.com"
    });
    break;
}
