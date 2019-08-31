import React, { Component } from "react";
import PropsTypes from "prop-types";
import PathToRegexp from 'path-to-regexp'

export class HashRouter extends Component {
  static contextTypes = {
    location : PropsTypes.object
  }
  render() {
    debugger
      let {path,component:Component} = this.props;
      let {location:{pathname}} = this.context;
      // 这样|| pathname.startsWith(path) 是不对的所有的都会匹配到 '/' 
      // R(path,[],{end:false}).test(pathname)
      // if(path == pathname || (path!=='/'&&pathname.startsWith(path))){
        if(PathToRegexp(path,[],{end:false}).test(pathname)){
          return <Component location={this.context.location} history={this.context.history}/>;
      }
        return null;
  }
}

export default HashRouter;
