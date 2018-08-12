import * as React from "react";
import styled from "react-emotion";
import { ComponentTiming } from "../../component-timing";
import { getNavigationData } from "../example-data-providers/navigation-data";

const NavigationOuter = styled("div")`
  width: 100%;
  height: 64px;
  display: flex;
  border: 1px solid black;

  & a {
    padding: 8px;
  }
`;

interface IOwnState {
  navigationItems: string[];
  loaded: boolean;
}

interface IOwnProps {}

export class Navigation extends React.Component<IOwnProps, IOwnState> {
  constructor(props: IOwnProps) {
    super(props);

    this.state = {
      loaded: true,
      navigationItems: []
    };
  }

  public componentDidMount() {
    this.loadNavItems();
  }

  public render() {
    return (
      <ComponentTiming id="navigation" isSelfLoaded={this.state.loaded}>
        <NavigationOuter>
          {this.state.navigationItems.map((item, i) => (
            <a href="#" key={i}>
              {item}
            </a>
          ))}
        </NavigationOuter>
      </ComponentTiming>
    );
  }

  private loadNavItems = async () => {
    this.setState({
      loaded: false,
      navigationItems: []
    });
    const navigationItems = await getNavigationData();
    this.setState({
      loaded: true,
      navigationItems
    });
  };
}
