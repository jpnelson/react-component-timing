import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTimingRoot } from "../index";

import { action } from "@storybook/addon-actions";
import { Navigation } from "./example-components/navigation";
import { DelayedBlock } from "./example-components/delayed-block";

storiesOf("Component timing", module)
  .add("With a navigation and a timer", () => (
    <ComponentTimingRoot
      reporter={timingEvent => {
        action("timing event")(timingEvent);
      }}
    >
      <Navigation />
      <Timer />
    </ComponentTimingRoot>
  ))
  .add("With a nested loading components", () => (
    <ComponentTimingRoot
      reporter={timingEvent => {
        action("timing event")(timingEvent);
      }}
    >
      <DelayedBlock id={"pink"} color={"pink"} delay={100}>
        <DelayedBlock id={"red"} color={"red"} delay={200} />
        <DelayedBlock id={"green"} color={"green"} delay={300} />
        <DelayedBlock id={"blue"} color={"blue"} delay={400} />
        <DelayedBlock id={"orange"} color={"orange"} delay={500} />
      </DelayedBlock>
    </ComponentTimingRoot>
  ))
  .add("With a randomly ordered child components", () => (
    <ComponentTimingRoot
      reporter={timingEvent => {
        action("timing event")(timingEvent);
      }}
    >
      <DelayedBlock id={"pink"} color={"pink"} delay={100}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => <DelayedBlock key={i} id={"red"} color={"red"} delay={Math.random() * 1000 + 100} />)
        }
      </DelayedBlock>
    </ComponentTimingRoot>
  ));
