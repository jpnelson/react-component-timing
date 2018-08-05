import * as React from "react";

export interface ITimingEvent {
  time: number;
  id: string;
  event: "load";
}

export interface IComponentTimingRootContext {
  onLoad: (timingEvent: ITimingEvent) => void;
}

interface IOwnProps {
  reporter: (timingEvent: ITimingEvent) => void;
}

const { Provider, Consumer } = React.createContext<IComponentTimingRootContext>(
  {
    onLoad: (timingEvent: ITimingEvent) => null
  }
);

export const RootConsumer = Consumer;

export class ComponentTimingRoot extends React.Component<IOwnProps> {
  public render() {
    return (
      <Provider value={{ onLoad: this.onLoad }}>{this.props.children}</Provider>
    );
  }

  private onLoad = (timingEvent: ITimingEvent) => {
    this.props.reporter(timingEvent);
  };
}
