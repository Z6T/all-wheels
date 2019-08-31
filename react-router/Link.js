import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Link extends Component {
    static contextTypes = {
        history:PropTypes.object
    }
    render() {
        return (
           <a onClick={()=>{this.context.history.push(this.props.to)}}>{this.props.children}</a>
        )
    }
}

export default Link
