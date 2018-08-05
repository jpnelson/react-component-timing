import { ITimingEvent } from "../../component-timing-root";

export function newrelicReporter(timingEvent: ITimingEvent) {
  const newRelic = (window as any).newrelic;
  newRelic.addPageAction(timingEvent.id, {
    time: timingEvent.time
  });
}
