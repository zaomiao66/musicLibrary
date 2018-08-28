import React from 'react';

export default class Tab extends React.Component {
    constructor() {
        super();
        this.state = {
    
        };
      }
    render() {
        console.log('React.Children', this.props.children)
        return (
            // React.Children.map(this.props.children, element => {element} )
            <span>{this.props.children}</span>
        )
    }
}