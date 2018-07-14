import * as React from "react";

const ReactProfiler = (React as any).unstable_Profiler; //No typing available for the unstable API

interface OwnProps {
  id: string;
  reporter: () => void;
}

export class Profiler extends React.Component<OwnProps> {
  render() {
    return (
      <ReactProfiler id={this.props.id} onRender={this.props.reporter}>
        {this.props.children}
      </ReactProfiler>
    );
  }
}
