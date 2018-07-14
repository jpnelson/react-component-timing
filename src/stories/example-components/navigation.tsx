import * as React from "react";
import styled from "react-emotion";

const NavigationOuter = styled("div")`
  width: 100%;
  height: 64px;
  display: flex;
  border: 1px solid black;
`;

export class Navigation extends React.Component {
  render() {
    return (
      <div>
        <a href="#page-one">Page 1</a>
        <a href="#page-two">Page 2</a>
        <a href="#page-three">Page 3</a>
      </div>
    );
  }
}
