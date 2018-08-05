import * as React from "react";
import "./app.css";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import { ComponentTimingRoot } from "../../src";

const Example = () => <span>1</span>;

export class App extends React.Component {
  public render() {
    return (
      <div>
        {/* <ComponentTimingRoot reporter={window.console.log}> */}
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>

            <hr />

            <Route exact={true} path="/" component={Example} />
            <Route exact={true} path="/about" component={Example} />
            <Route exact={true} path="/topics" component={Example} />
          </div>
        </Router>
        {/* </ComponentTimingRoot> */}
      </div>
    );
  }
}
