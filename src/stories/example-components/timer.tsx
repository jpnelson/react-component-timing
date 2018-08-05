import * as React from "react";
import { ComponentTiming } from "../../index";

interface IOwnState {
  now: number;
  timer: number;
}

interface IOwnProps {}

export class Timer extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    this.state = {
      now: Date.now(),
      timer: 0
    };
  }
  public componentDidMount() {
    const timer = window.setInterval(() => {
      this.setState({
        now: Date.now()
      });
    }, 1000);

    this.setState({
      timer
    });
  }

  public componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }

  public render() {
    return (
      <ComponentTiming id="timer" isLoaded={() => true}>
        <span>{this.state.now}</span>
      </ComponentTiming>
    );
  }
}
