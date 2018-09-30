import React from "react";
import Loadable from "react-loadable";

export const Login = Loadable({
  loader: () => import("../containers/login/Login"),
  loading: () => <div>Loading....</div>
});

export const PostList = Loadable({
  loader: () => import("../containers/posts/PostList"),
  loading: () => <div>Loading....</div>
});
