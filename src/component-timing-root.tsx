import * as React from "react";

export type TimingEvent = {
  time: number;
  id: string;
  event: "load";
};

export interface ComponentTimingRootContext {
  onLoad: (timingEvent: TimingEvent) => void;
}

interface OwnProps {
  reporter: (timingEvent: TimingEvent) => void;
}

const { Provider, Consumer } = React.createContext<ComponentTimingRootContext>({
  onLoad: (timingEvent: TimingEvent) => null
});

export const RootConsumer = Consumer;

export class ComponentTimingRoot extends React.Component<OwnProps> {
  private onLoad = (timingEvent: TimingEvent) => {
    this.props.reporter(timingEvent);
  };

  render() {
    return (
      <Provider value={{ onLoad: this.onLoad }}>{this.props.children}</Provider>
    );
  }
}
