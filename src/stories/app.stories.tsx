import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Timer } from "./example-components/timer";
import { ComponentTiming } from "../";

import { action } from "@storybook/addon-actions";

storiesOf("Component timing", module).add("With a timer", () => (
  <ComponentTiming id="Navigation" reporter={action("component timing")}>
    <Timer />
  </ComponentTiming>
));
