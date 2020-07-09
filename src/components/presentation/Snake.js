import React, { Component } from "react";

export default class Snake extends Component{

    render(){
        let template = [];
        this.props.dots.map((dot, i) => {
            const style = {
                top: `${dot[1]}%`,
                left: `${dot[0]}%`
            }
            
            return template.push(<div key={i} className="snake-dot" style={style}></div>);
            
        });
        return (
            <div>
                {template}
            </div>
        );
    }
}