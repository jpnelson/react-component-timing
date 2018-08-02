import * as React from "react";
import { ComponentTiming } from "../../component-timing";
import { Block } from "./block";

interface OwnState {
  loaded: boolean;
}

interface OwnProps {
  delay: number;
  color: string;
  id: string;
}

export class AlternatingBlock extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        loaded: !this.state.loaded
      });
    }, this.props.delay);
  }

  render() {
    return (
      <ComponentTiming id={this.props.id} isLoaded={() => this.state.loaded}>
        <Block color={this.state.loaded ? this.props.color : "transparent"}>
          {this.props.children}
        </Block>
      </ComponentTiming>
    );
  }
}
