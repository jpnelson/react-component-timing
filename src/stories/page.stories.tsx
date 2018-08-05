import * as React from "react";

import { storiesOf } from "@storybook/react";

import { ComponentTimingRoot } from "../index";
import { Timer } from "./example-components/timer";

import { RoutingPage } from "./example-components/routing-page";
import { googleAnalyicsReporter } from "./example-reporters/googleanalytics-reporter";
import { newrelicReporter } from "./example-reporters/newrelic-reporter";

storiesOf("Routing", module)
  .add("New relic", () => <RoutingPage reporter={newrelicReporter} />)
  .add("Google analytics", () => (
    <RoutingPage reporter={googleAnalyicsReporter} />
  ));
