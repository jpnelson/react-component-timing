import { action } from "@storybook/addon-actions";
import { ITimingEvent } from "../../component-timing-root";

export const actionReporter = (timingEvent: ITimingEvent) => {
  action(`${timingEvent.id}`)(timingEvent.time);
};
