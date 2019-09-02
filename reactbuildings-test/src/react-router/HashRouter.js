import React, { Component } from "react";
import PropsTypes from "prop-types";

class HashRouter extends Component {
  static childContextTypes = {
    location: PropsTypes.object,
    history:PropsTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      location:{
        state:{},
        pathname: window.location.hash.slice(1) || "/"
      }
    };
  }

  getChildContext() {
    let _this = this;
    return {
      location: this.state.location,
      history:{
        push(path){
          if(typeof path === 'object'){
            let {pathname,state} = path;
            _this.setState({
              // 新的location对象
              location:{
                ..._this.state.location,state,pathname
              }
            },()=>{
              window.location.hash = pathname;
            })
          }else{
            _this.setState({
              location:{
                ..._this.state.location,
                pathname:path
              }
            },()=>{
              // path是字符串，直接设置
              window.location.hash = path;
            })
          }
        }
      }
    };
  }
  
  componentDidMount() {
    window.location.hash = window.location.hash || "/";
    let render = () => {
      this.setState({location:{...this.state.location,pathname:window.location.hash.slice(1)||'/'}});
    };
    window.addEventListener("hashchange", render);
  }
  render() {
    return this.props.children;
  }
}

export default HashRouter;
