import * as React from "react";
import { ComponentTiming, LoadingStates } from "../../component-timing";
import { Block } from "./block";

interface OwnState {
  loaded: boolean;
}

interface OwnProps {
  isLoaded: (loadingStates: LoadingStates) => boolean;
  color: string;
  id: string;
}

export class CustomBlock extends React.Component<OwnProps, OwnState> {
  render() {
    return (
      <ComponentTiming id={this.props.id} isLoaded={this.props.isLoaded}>
        <Block color={this.props.color}>{this.props.children}</Block>
      </ComponentTiming>
    );
  }
}
