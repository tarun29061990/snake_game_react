import React, { Component } from 'react';

export default class Food extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const styles = {
            top: `${this.props.position[1]}%`,
            left: `${this.props.position[0]}%`
        }

        return (
            <div className="food" style={styles}></div>
        )
    }
}