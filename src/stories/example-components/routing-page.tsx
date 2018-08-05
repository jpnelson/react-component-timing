import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { TimingEvent } from "../../component-timing-root";
import { ComponentTimingRoot } from "../../index";
import { newrelicReporter } from "../example-reporters/newrelic-reporter";
import { DelayedBlock } from "./delayed-block";

interface IOwnProps {
  reporter: (timingEvent: TimingEvent) => void;
}

export class RoutingPage extends React.Component<IOwnProps> {
  public render() {
    return (
      <ComponentTimingRoot reporter={this.props.reporter}>
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

            <Route
              exact
              path="/"
              component={() => (
                <DelayedBlock id="red" color="red" delay={1000} />
              )}
            />
            <Route
              exact
              path="/about"
              component={() => (
                <DelayedBlock id="green" color="green" delay={1000} />
              )}
            />
            <Route
              exact
              path="/topics"
              component={() => (
                <DelayedBlock id="blue" color="blue" delay={1000} />
              )}
            />
          </div>
        </Router>
      </ComponentTimingRoot>
    );
  }
}
