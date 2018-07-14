import * as React from "react";

export class ComponentTimingProvider extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
