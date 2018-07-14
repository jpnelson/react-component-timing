import * as React from "react";

import { Profiler } from "./profiler";

interface OwnProps {
  id: string;
  reporter: () => void;
}

export class ComponentTiming extends React.Component<OwnProps> {
  render() {
    return (
      <Profiler id={this.props.id} reporter={this.props.reporter}>
        {this.props.children}
      </Profiler>
    );
  }
}
