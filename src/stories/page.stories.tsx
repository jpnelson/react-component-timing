import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTimingRoot } from "../index";

import { newrelicReporter } from "./example-reporters/newrelic-reporter";
import { RoutingPage } from "./example-components/routing-page";
import { googleAnalyicsReporter } from "./example-reporters/googleanalytics-reporter";

storiesOf("Routing", module)
  .add("New relic", () => <RoutingPage reporter={newrelicReporter} />)
  .add("Google analytics", () => (
    <RoutingPage reporter={googleAnalyicsReporter} />
  ));
