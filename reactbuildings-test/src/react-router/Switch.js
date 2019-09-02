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
