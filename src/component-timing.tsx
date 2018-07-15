import * as React from "react";

import { ComponentTimingConsumer } from "./component-timing-provider";
import { ProvidedContext } from "./component-timing-provider";

interface OwnProps {
  id: string;
  isLoaded: () => boolean;
}

export class ComponentTiming extends React.Component<OwnProps> {
  private lastLoaded: number;
  private isLoaded: boolean;

  constructor(props: OwnProps) {
    super(props);
    this.lastLoaded = 0;
    this.isLoaded = false;
  }

  private onRender = (context: ProvidedContext) => {
    const wasLoaded = this.isLoaded;
    const isLoaded = this.props.isLoaded();

    if (isLoaded && !wasLoaded) {
      const now = window.performance.now();

      context.onLoad({
        id: this.props.id,
        event: "load",
        time: now - this.lastLoaded
      });

      this.lastLoaded = now;
    }

    this.isLoaded = isLoaded;
  };

  render() {
    return (
      <ComponentTimingConsumer>
        {context => {
          this.onRender(context);
          return <React.Fragment>{this.props.children}</React.Fragment>;
        }}
      </ComponentTimingConsumer>
    );
  }
}
