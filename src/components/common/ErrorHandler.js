import React, { Component } from "react";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-danger">Something went wrong!</h1>;
    }
    return (
      this.props.children || <h1 className="text-danger">No Components!</h1>
    );
  }
}

export default ErrorHandler;
