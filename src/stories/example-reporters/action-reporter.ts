import { action } from "@storybook/addon-actions";
import { TimingEvent } from "../../component-timing-root";

export const actionReporter = (timingEvent: TimingEvent) => {
  action(`${timingEvent.id}`)(timingEvent.time);
};
