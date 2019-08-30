import React, { Component } from "react";
import PropsTypes from "prop-types";

class HashRouter extends Component {
  static childContextTypes = {
    location: PropsTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      location: { pathname: window.location.hash.slice(1) || "/" }
    };
  }
  componentWillMount() {
    window.location.hash = window.location.hash || "/";
    let render = () => {
        console.log('render', render)
      this.setState({});
    };
    window.addEventListener("hashchange", render);
  }
  render() {
    return this.props.children;
  }
}

export default HashRouter;
