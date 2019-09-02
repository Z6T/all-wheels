
# 干react轮子系列一（React-router）

**准备发布一个react系列造轮子文章，事关Redux,React-Redux,Redux-Saga等，就是人狠话不多**,**不一定按顺序发布，也可能会有别的文章穿插。**

## [先点击在线预览react-router的实现效果，先爽一下](https://codesandbox.io/s/sad-taussig-tb57b)，codesandbox，可能会慢

本节Github代码：[Build-your-own-xxx-based-on-Javascript](https://github.com/Z6T/Build-your-own-xxx-based-on-Javascript)，在这个库的react-router目录下，后续的轮子也会在这个下边更新，你自己实现了这些轮子后，那些功能和api想忘都忘不掉了,这可怎么办

先看看react-router-dom是怎么实现的?它的功能一个index.js就可以,不需要别的特别多的组件来阐述..

## 起势：

 一个很常规的index.js文件：

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import App from './components/App';

import { HashRouter as Router, Route, Switch ,Link} from 'react-router-dom'

// User组件(点击用户的link展示的组件)
let User = () => <div>User</div>
// Home组件(点击首页的link展示的组件)
let Home = () => <div>
     <Router>
         <h6>
            <Link to={{ pathname : '/home/user' , state : { day: 'Friday' }}}>user</Link>   
            <Link to="/home/bitch">bitch</Link>
         </h6>
            <Switch>
                <Route path="/home/user" component={HomeUser}></Route>
                <Route path="/home/bitch" component={HomeBitch}></Route>
            </Switch>
        </Router>
</div>;

// Home下的HomeUser组件
class HomeUser extends Component {
    render() {
        console.log('this.props.location', this.props.location)
        return (
            <div>
                {this.props.location.state.day} -----
                nihao
            </div>
        )
    }
}
// Home下的HomeBitch组件
let HomeBitch = () => <div>HomeBitch</div>


ReactDOM.render(
    <div>
        <Router>
            <h1>
                <Link to={{pathname:'/home',state:'keymap'}}>首页</Link>
                <Link to="/user">用户</Link>
            </h1>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/user" component={User}></Route>
            </Switch>
        </Router>
    </div>
    , document.getElementById('root'));
```

## 实现目标:

1、实现HashRouter

2、实现Route

3、实现Switch

4、实现Link

5、实现路由通过对象传参

好了就这几个小目标~

## 先来分析：

1. 首先要实现的这些全部都是React组件，都会有两个默认参数，props和context
2. 这些组件之间传递数据需要使用到全局对象context,使用方法是，先在祖先组件中定义childContextTypes,需要使用到prop-types这个包，并定义getChildContext方法，在这个方法中返回你要传递的数据，然后再子孙组件中定义contextTypes，来接收。
3. 我们知道在react-router-dom的使用中，获取pathname和state的方法分别是 `this.props.location.pathname`,`this.props.location.state`,这就可以决定HashRouter顶层组件的state的结构了，并在这个组件中监听hashchange方法，hash改变就重新渲染DOM
4. Switch内部其实做的事情并不多，真实使用中，你不引入Switch，把switch换成div也没有问题，至于为什么，下边写代码的过程中会解释
5. 关于Link,其实是一个a链接,在react-router-dom中，点击Link的时候需要调用this.props.history.push( pathname ),很显然这个是从HashRouter组件通过context传递过来的,这个同时也决定了context传递的数据中一定有一个push方法。

好了，大致是这样的，开始上代码：

先新建react-router / HashRouter.js

## HashRouter组件：

```js
import React, { Component } from "react";
import PropsTypes from "prop-types";

class HashRouter extends Component {
  static childContextTypes = {
    location: PropsTypes.object,
    history:PropsTypes.object
  };
  constructor(props) {
    super(props);
    // state中只有一个location对象，location里边有两个属性，state和pathname
    this.state = {
      location:{
        state:{}, // 点击Link需要通过state传递参数,这个就是保存传递参数的state
        pathname: window.location.hash.slice(1) || "/"  // 定义当前的hash,用pathname表示
      }
    };
  }

  getChildContext() {
    let _this = this;
    return {
      // 将当前的location也通过context传递
      location: this.state.location,
      // 点击Link调用的 this.props.history.push( pathname ) 就是调用的这个push方法
      history:{
        // 待会看到Link组件的时候，再回头来看这个push方法更好，
        push(path){
          // 如果path是对象就解构拿到state
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
            // path是字符串就直接设置hash为这个path,触发hashchange重新渲染
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
    // 如果你访问localhost:3000 会变成 localhost:3000/#/  ,这就是原理
    window.location.hash = window.location.hash || "/";
    let render = () => {
      // setState就会导致UI重新渲染，这个时候把变化后的hash存进state
      this.setState({location:{...this.state.location,pathname:window.location.hash.slice(1)||'/'}});
    };
    // 监听hash的变化，当hash变化的时候，就触发render
    window.addEventListener("hashchange", render);
  }
  render() {
    // 注意：然后这里就是把Switch以及它包括的那一坨返回了，我们都知道，render函数必须有一个唯一的根节点
    // 如果没有switch，那这里就是返回3个Route组件了，就没有一个唯一的根节点了
    // 因此需要Switch组件来提供根节点，所以其实你换成div也是照样渲染的。。。
    return this.props.children;
  }
}

export default HashRouter;

```

## Switch组件：

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp'

export class Switch extends Component {
    static contextTypes = {
        location : PropTypes.object
      }
    render(){
        return this.props.children;
    }
}

export default Switch

```

## Route组件：

```js
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
      // 注意：这样 path == pathname|| pathname.startsWith(path) 是不对的所有的都会匹配到 '/' ,会陷入死循环
    	
      // 这样写也是可以的：if(path == pathname || (path!=='/'&&pathname.startsWith(path))){
    
    // 下边的使用了path-to-regexp这个库，react-router源码内部实际就是使用了这个库
        if(PathToRegexp(path,[],{end:false}).test(pathname)){
          // 也就是说当前路由是 /xxx/yyy的话，/xxx和/xxx/yyy对应的组件都应该显示
          
          // 路径匹配就渲染了参数component对应的组件,并将location和history作为属性传递给子组件，这样就可以通过this.porps.history.xxx和this.porps.location.xxx来调用
          return <Component location={this.context.location} history={this.context.history}/>;
      }
        return null;
  }
}

export default HashRouter;
```

## Link组件：

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Link extends Component {
    static contextTypes = {
        history:PropTypes.object
    }
    render() {
        return (
          // 直接调用context传递过来的push方法
           <a onClick={()=>{this.context.history.push(this.props.to)}}>{this.props.children}</a>
        )
    }
}

export default Link
```

**代码以及注释详尽至此，如果对你有帮助，不妨点赞关注走一波~ 看下往期文章，相信你也会收货惊喜~**

