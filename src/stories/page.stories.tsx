import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTimingRoot } from "../index";

import { action } from "@storybook/addon-actions";
import { Navigation } from "./example-components/navigation";
import { TimingEvent } from "../component-timing-root";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DelayedBlock } from "./example-components/delayed-block";

const reporter = (timingEvent: TimingEvent) => {
  action(`${timingEvent.id}`)(timingEvent.time);
};

storiesOf("Routing", module).add("With react router", () => (
  <ComponentTimingRoot reporter={reporter}>
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
          component={() => <DelayedBlock id="red" color="red" delay={1000} />}
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
          component={() => <DelayedBlock id="blue" color="blue" delay={1000} />}
        />
      </div>
    </Router>
  </ComponentTimingRoot>
));
