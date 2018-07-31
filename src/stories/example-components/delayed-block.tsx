import * as React from "react";
import styled from "react-emotion";
import { ComponentTiming, LoadingStates } from "../../component-timing";

const BlockOuter = styled("div")`
  padding: 8px;
  background: ${(props: { color: string }) => props.color};
  min-height: 64px;
  min-width: 64px;
  display: flex;
  flex-direction: row;
`;

interface OwnState {
  loaded: boolean;
}

interface OwnProps {
  delay: number;
  color: string;
  id: string;
  index?: number;
}

export class DelayedBlock extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  private isLoaded = (loadingStates: LoadingStates) => {
    return this.state.loaded;
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, this.props.delay);
  }

  render() {
    return (
      <ComponentTiming
        id={this.props.id}
        index={this.props.index}
        isLoaded={this.isLoaded}
      >
        <BlockOuter
          color={this.state.loaded ? this.props.color : "transparent"}
        >
          {this.props.children}
        </BlockOuter>
      </ComponentTiming>
    );
  }
}
