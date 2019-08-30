import React, { Component } from "react";
import PropsTypes from "prop-types";

export class HashRouter extends Component {
  static contextTypes = {
    location : PropsTypes.object
  }
  render() {
      console.log('this.props :', this.props);
      console.log('this.context :', this.context);
      let {path,component:Component} = this.props;
      let {location:{pathname}} = this.context;
      if(path == pathname || pathname.startsWith(path)){
          return <Component location={this.context.location}/>;
      }
        return null;
  }
}

export default HashRouter;
