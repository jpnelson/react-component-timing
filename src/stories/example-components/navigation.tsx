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

interface OwnState {
  navigationItems: string[];
  loaded: boolean;
}

interface OwnProps {}

export class Navigation extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
      navigationItems: [],
      loaded: true
    };
  }
  private loadNavItems = async () => {
    this.setState({
      navigationItems: [],
      loaded: false
    });
    const navigationItems = await getNavigationData();
    this.setState({
      navigationItems,
      loaded: true
    });
  };

  private isLoaded = () => {
    return this.state.loaded;
  };

  componentDidMount() {
    this.loadNavItems();
  }

  render() {
    return (
      <ComponentTiming id="navigation" isLoaded={this.isLoaded}>
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
}
