import * as React from "react";

interface OwnState {
  now: number;
  timer: number;
}

interface OwnProps {}

export class Timer extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
      now: Date.now(),
      timer: 0
    };
  }
  componentDidMount() {
    const timer = window.setInterval(() => {
      this.setState({
        now: Date.now()
      });
    }, 1000);

    this.setState({
      timer
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }

  render() {
    console.log(this.state);
    return <span>{this.state.now}</span>;
  }
}
