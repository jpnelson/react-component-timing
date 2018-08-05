import { ITimingEvent } from "../../component-timing-root";

export function googleAnalyicsReporter(timingEvent: ITimingEvent) {
  (window as any).ga(
    "send",
    "timing",
    timingEvent.id,
    timingEvent.event,
    Math.round(timingEvent.time)
  );
}
