import * as React from "react";

import { storiesOf } from "@storybook/react";

import { ComponentTimingRoot } from "../index";
import { Timer } from "./example-components/timer";

import { AlternatingBlock } from "./example-components/alternating-block";
import { CustomBlock } from "./example-components/custom-block";
import { DelayedBlock } from "./example-components/delayed-block";
import { Navigation } from "./example-components/navigation";

import { actionReporter } from "./example-reporters/action-reporter";

storiesOf("Component timing", module)
  .add("With a navigation and a timer", () => (
    <ComponentTimingRoot reporter={actionReporter}>
      <Navigation />
      <Timer />
    </ComponentTimingRoot>
  ))
  .add("With a nested loading components", () => (
    <ComponentTimingRoot reporter={actionReporter}>
      <CustomBlock
        id="pink"
        color="pink"
        isSelfLoaded={true}
        isLoaded={(isSelfLoaded, { red, green, blue, orange }) =>
          isSelfLoaded && red && green && blue && orange
        }
      >
        <DelayedBlock id="red" color="red" delay={200} />
        <DelayedBlock id="green" color="green" delay={300} />
        <DelayedBlock id="blue" color="blue" delay={400} />
        <DelayedBlock id="orange" color="orange" delay={500} />
      </CustomBlock>
    </ComponentTimingRoot>
  ))
  .add("With a randomly ordered child components", () => (
    <ComponentTimingRoot reporter={actionReporter}>
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
    <ComponentTimingRoot reporter={actionReporter}>
      <CustomBlock
        id="red"
        color="red"
        isSelfLoaded={true}
        isLoaded={(isSelfLoaded, { pink }) => isSelfLoaded && pink}
      >
        <AlternatingBlock id="pink" color="pink" delay={2000} />
      </CustomBlock>
    </ComponentTimingRoot>
  ));
