import * as React from "react";
import { ComponentTiming } from "../../component-timing";
import { Block } from "./block";

interface IOwnState {
  loaded: boolean;
}

interface IOwnProps {
  delay: number;
  color: string;
  id: string;
}

export class DelayedBlock extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, this.props.delay);
  }

  public render() {
    return (
      <ComponentTiming id={this.props.id} isSelfLoaded={this.state.loaded}>
        <Block color={this.state.loaded ? this.props.color : "transparent"}>
          {this.props.children}
        </Block>
      </ComponentTiming>
    );
  }
}
