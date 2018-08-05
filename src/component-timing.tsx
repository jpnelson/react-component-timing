import * as React from "react";

import {
  IComponentTimingRootContext,
  RootConsumer
} from "./component-timing-root";

export interface ILoadingStates {
  [key: string]: boolean;
}

interface IOwnProps {
  id: string;
  isLoaded: (loadingStates: ILoadingStates) => boolean;
}

interface IOwnState {
  loadingStates: ILoadingStates;
}

interface IComponentTimingContext {
  informParentOfChildLoad: (id: string, loaded: boolean) => void;
  registerWithParent: (id: string) => void;
  unregisterWithParent: (id: string) => void;
}

const {
  Provider: ChildProvider,
  Consumer: ChildConsumer
} = React.createContext<IComponentTimingContext>({
  informParentOfChildLoad: () => null,
  registerWithParent: () => null,
  unregisterWithParent: () => null
});

export class ComponentTiming extends React.Component<IOwnProps, IOwnState> {
  private isLoaded: boolean;
  private isRegistered: boolean;
  private unregisterWithParent: (id: string) => void;

  constructor(props: IOwnProps) {
    super(props);
    this.isLoaded = true;
    this.isRegistered = false;
    this.unregisterWithParent = () => null;

    this.state = {
      loadingStates: {}
    };
  }

  public componentWillUnmount() {
    this.unregisterWithParent(this.props.id);
  }

  public render() {
    return (
      <RootConsumer>
        {rootContext => {
          return (
            <ChildConsumer>
              {parentContext => {
                if (!this.isRegistered) {
                  parentContext.registerWithParent(this.props.id);
                  this.unregisterWithParent =
                    parentContext.unregisterWithParent;
                  this.isRegistered = true;
                }

                this.onRender(rootContext, parentContext);

                return (
                  <ChildProvider
                    value={{
                      informParentOfChildLoad: this.onChildLoad,
                      registerWithParent: this.onChildRegister,
                      unregisterWithParent: this.onChildUnregister
                    }}
                  >
                    {this.props.children}
                  </ChildProvider>
                );
              }}
            </ChildConsumer>
          );
        }}
      </RootConsumer>
    );
  }

  private onChildLoad = (id: string, loaded: boolean): void => {
    this.setState({
      loadingStates: { ...this.state.loadingStates, [id]: loaded }
    });
  };

  private onChildRegister = (id: string): void => void 0;
  private onChildUnregister = (id: string): void => void 0;

  private checkLoaded(): boolean {
    return this.props.isLoaded(this.state.loadingStates);
  }

  private onRender = (
    rootContext: IComponentTimingRootContext,
    parentContext: IComponentTimingContext
  ) => {
    const wasLoaded = this.isLoaded;
    const isLoaded = this.checkLoaded();

    if (!wasLoaded && isLoaded) {
      parentContext.informParentOfChildLoad(this.props.id, isLoaded);

      this.stopTiming();

      rootContext.onLoad({
        event: "load",
        id: this.props.id,
        time: this.getMostRecentTime()
      });
    } else if (wasLoaded && !isLoaded) {
      parentContext.informParentOfChildLoad(this.props.id, isLoaded);
      this.startTiming();
    }

    this.isLoaded = isLoaded;
  };

  private startTiming() {
    window.performance.mark(this.getStartMarkName());
  }

  private stopTiming() {
    window.performance.mark(this.getEndMarkName());
    window.performance.measure(
      this.getMeasureName(),
      this.getStartMarkName(),
      this.getEndMarkName()
    );
  }

  private getMostRecentTime() {
    const performanceEntries = window.performance.getEntriesByName(
      this.getMeasureName(),
      "measure"
    );
    return performanceEntries[performanceEntries.length - 1].duration;
  }

  private getStartMarkName() {
    return `${this.props.id}-load-start`;
  }

  private getEndMarkName() {
    return `${this.props.id}-load-end`;
  }

  private getMeasureName() {
    return `${this.props.id}-loading-time`;
  }
}
