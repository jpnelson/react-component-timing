import * as React from "react";
import { ComponentTiming, ILoadingStates } from "../../component-timing";
import { Block } from "./block";

interface IOwnState {
  loaded: boolean;
}

interface IOwnProps {
  isLoaded: (loadingStates: ILoadingStates) => boolean;
  color: string;
  id: string;
}

export class CustomBlock extends React.Component<IOwnProps, IOwnState> {
  public render() {
    return (
      <ComponentTiming id={this.props.id} isLoaded={this.props.isLoaded}>
        <Block color={this.props.color}>{this.props.children}</Block>
      </ComponentTiming>
    );
  }
}
