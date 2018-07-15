import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTiming, ComponentTimingProvider } from "../index";

import { action } from "@storybook/addon-actions";
import { Navigation } from "./example-components/navigation";

storiesOf("Component timing", module).add(
  "With a navigation and a timer",
  () => (
    <ComponentTimingProvider
      reporter={timingEvent => {
        action("timing event")(timingEvent);
      }}
    >
      <Navigation />
      <Timer />
    </ComponentTimingProvider>
  )
);
