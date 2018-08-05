import { TimingEvent } from "../../component-timing-root";

export function googleAnalyicsReporter(timingEvent: TimingEvent) {
  (window as any).ga(
    "send",
    "timing",
    timingEvent.id,
    timingEvent.event,
    Math.round(timingEvent.time)
  );
}
