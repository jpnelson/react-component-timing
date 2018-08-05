import { TimingEvent } from "../../component-timing-root";

export function newrelicReporter(timingEvent: TimingEvent) {
    const newRelic = ((window as any).newrelic);
    newRelic.addPageAction(timingEvent.id, {
        time: timingEvent.time,
    });
}