module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["@babel/env", "@babel/react"],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import"
    ]
  };
};
