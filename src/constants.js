const defaultProps = {
  USER_SESSION: "user",
  CACHE_QUOTA_PERCENTAGE: 40
};
module.exports = defaultProps;
switch (process.env.NODE_ENV) {
  case "development":
    module.exports = Object.assign(defaultProps, {
      USER_API_BASE_URL: "https://reqres.in",
      POST_API_BASE_URL: "https://jsonplaceholder.typicode.com",
      NEWS_API_BASE_URL:
        "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey="
    });
    break;
  case "production":
    module.exports = Object.assign(defaultProps, {
      USER_API_BASE_URL: "https://reqres.in",
      POST_API_BASE_URL: "https://jsonplaceholder.typicode.com",
      NEWS_API_BASE_URL:
        "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey="
    });
    break;
}
