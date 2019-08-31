import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import App from './components/App';

import { HashRouter as Router, Route, Switch ,Link} from '../../react-router/index'
// import { HashRouter as Router, Route, Switch ,Link} from 'react-router-dom'

export class HomeUser extends Component {
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

let HomeBitch = () => <div>HomeBitch</div>
let Home = () => <div>
     <Router>
         <h6>
            <Link to={{ pathname : '/home/user' , state : { day: 'Friday' }}}>user</Link>   <br/>
            <Link to="/home/bitch">bitch</Link>
         </h6>
            <Switch>
                <Route path="/home/user" component={HomeUser}></Route>
                <Route path="/home/bitch" component={HomeBitch}></Route>
            </Switch>
        </Router>
</div>
let User = () => <div>User</div>

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