import * as React from "react";

type TimingEvent = {
  time: number;
  id: string;
  event: "load";
};

export interface ProvidedContext {
  onLoad: (timingEvent: TimingEvent) => void;
}

interface OwnProps {
  reporter: (timingEvent: TimingEvent) => void;
}

const { Provider, Consumer } = React.createContext<ProvidedContext>({
  onLoad: (timingEvent: TimingEvent) => null
});

export const ComponentTimingConsumer = Consumer;

export class ComponentTimingProvider extends React.Component<OwnProps> {
  private onLoad = (timingEvent: TimingEvent) => {
    this.props.reporter(timingEvent);
  };

  render() {
    return (
      <Provider value={{ onLoad: this.onLoad }}>{this.props.children}</Provider>
    );
  }
}
