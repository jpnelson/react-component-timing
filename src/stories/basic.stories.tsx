import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTimingRoot } from "../index";

import { action } from "@storybook/addon-actions";
import { Navigation } from "./example-components/navigation";
import { DelayedBlock } from "./example-components/delayed-block";
import { TimingEvent } from "../component-timing-root";
import { AlternatingBlock } from "./example-components/alternating-block";
import { CustomBlock } from "./example-components/custom-block";

const reporter = (timingEvent: TimingEvent) => {
  action(`${timingEvent.id}`)(timingEvent.time);
};

storiesOf("Component timing", module)
  .add("With a navigation and a timer", () => (
    <ComponentTimingRoot reporter={reporter}>
      <Navigation />
      <Timer />
    </ComponentTimingRoot>
  ))
  .add("With a nested loading components", () => (
    <ComponentTimingRoot reporter={reporter}>
      <DelayedBlock id="pink" color="pink" delay={100}>
        <DelayedBlock id="red" color="red" delay={200} />
        <DelayedBlock id="green" color="green" delay={300} />
        <DelayedBlock id="blue" color="blue" delay={400} />
        <DelayedBlock id="orange" color="orange" delay={500} />
      </DelayedBlock>
    </ComponentTimingRoot>
  ))
  .add("With a randomly ordered child components", () => (
    <ComponentTimingRoot reporter={reporter}>
      <DelayedBlock id="pink" color="pink" delay={100}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <DelayedBlock
            key={i}
            id="red"
            color="red"
            delay={Math.random() * 1000 + 100}
          />
        ))}
      </DelayedBlock>
    </ComponentTimingRoot>
  ))
  .add("With an alternating child", () => (
    <ComponentTimingRoot reporter={reporter}>
      <CustomBlock id="red" color="red" isLoaded={({ pink }) => pink}>
        <AlternatingBlock id="pink" color="pink" delay={2000} />
      </CustomBlock>
    </ComponentTimingRoot>
  ));
