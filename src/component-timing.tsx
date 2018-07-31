import * as React from "react";

import { RootConsumer } from "./component-timing-root";
import { ComponentTimingRootContext } from "./component-timing-root";

type ComponentLoadingState = {
  index: number;
  loaded: boolean;
};

export type LoadingStates = { [id: string]: ComponentLoadingState[] };

interface OwnProps {
  id: string;
  index?: number;
  isLoaded: (loadingStates: LoadingStates) => boolean;
}

interface OwnState {
  loadingStates: LoadingStates;
}

type ComponentTimingContext = {
  informParentOfChildLoad: (id: string, index: number, loaded: boolean) => void;
  registerWithParent: (id: string) => void;
  unregisterWithParent: (id: string) => void;
};

const {
  Provider: ChildProvider,
  Consumer: ChildConsumer
} = React.createContext<ComponentTimingContext>({
  informParentOfChildLoad: () => null,
  registerWithParent: () => null,
  unregisterWithParent: () => null
});

export class ComponentTiming extends React.Component<OwnProps, OwnState> {
  private lastLoaded: number;
  private isLoaded: boolean;
  private isRegistered: boolean;
  private unregisterWithParent: (id: string) => void;

  constructor(props: OwnProps) {
    super(props);
    this.lastLoaded = 0;
    this.isLoaded = false;
    this.isRegistered = false;
    this.unregisterWithParent = () => null;

    this.state = {
      loadingStates: {}
    };
  }

  private onChildLoad = (id: string, index: number, loaded: boolean): void => {
    const loadingStates = this.state.loadingStates[id] || [];
    let newLoadingStates: ComponentLoadingState[];

    const isRegistered = loadingStates.filter(
      ({ index: thisIndex }) => thisIndex === index
    ).length;

    if (!isRegistered) {
      newLoadingStates = [
        ...loadingStates,
        {
          index,
          loaded
        }
      ];
    } else {
      newLoadingStates = loadingStates.map(
        componentLoadingState =>
          componentLoadingState.index === index
            ? {
                index,
                loaded
              }
            : componentLoadingState
      );
    }

    this.setState({
      loadingStates: { ...this.state.loadingStates, [id]: newLoadingStates }
    });
  };

  private onChildRegister = (id: string): void => {};
  private onChildUnregister = (id: string): void => {};

  private onRender = (
    rootContext: ComponentTimingRootContext,
    parentContext: ComponentTimingContext
  ) => {
    const wasLoaded = this.isLoaded;
    const isLoaded = this.props.isLoaded(this.state.loadingStates);

    if (isLoaded && !wasLoaded) {
      parentContext.informParentOfChildLoad(
        this.props.id,
        this.props.index,
        isLoaded
      );

      const now = window.performance.now();

      rootContext.onLoad({
        id: this.props.id,
        event: "load",
        time: now - this.lastLoaded
      });

      this.lastLoaded = now;
    } else if (!isLoaded && wasLoaded) {
      parentContext.informParentOfChildLoad(
        this.props.id,
        this.props.index,
        isLoaded
      );
    }

    this.isLoaded = isLoaded;
  };

  componentWillUnmount() {
    this.unregisterWithParent(this.props.id);
  }

  render() {
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
}
