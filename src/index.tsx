import * as React from 'react';

export class ComponentTiming extends React.Component {
    render () {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}