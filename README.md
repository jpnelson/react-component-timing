# react-component-performance

Monitor performance at a per component level

**Current state is RFC 📄**

If you like this idea, or have know of something like this that already exists, or have feedback before I start making anything, let me know!

## Motivation for this tool

We want to measure the load time of our apps in a way that,

- **Meaningfully** reflects real _user_ experiences, including geography, devices, network conditions
- Works for single page applications that **progressively load** parts of the app ("cold" vs. "warm" page loads)
- Is **easily comparible** between applications

There are a number of performance metrics that already exist

### Ways of measuring performance

- window.onload timing
- Above-the-fold render time [(ATF)](http://assets.en.oreilly.com/1/event/62/Above%20the%20Fold%20Time_%20Measuring%20Web%20Page%20Performance%20Visually%20Presentation.pdf)
  - Measurable with webpagetest.org
- Time to first paint
- Time to first contentful paint
- Time to first meaningful paint
- Apdex (uses timings to create an index)

### Measuring Single page app performance

- window.onload just doesn't work for SPA's, it's not triggered for subsequent page loads, or at the right time
- Above-the-fold render time doesn't work for _real_ traffic, but it does give a good impression with simulated traffic.
- "Apdex" is not easy to compare (with different t values), and does not define what a "satisfactory" page load is.
- There is no such thing as "load time" as a single number. We want to represent a much richer picture.
  - We represent many different _experiences_ (cold page load, warm page load)
  - We represent many different _environments_ (network conditions, geographical location)
  - However, we need to reduce it to a single number for KPI's, OKR's, etc.
  - We want to compare fairly with other applications

### First "meaningful" paint

First meaningful paint provides a good way of measuring user experience, but requires knowledge of what "meaningful" is.

We also still need a good way to measure load times across "warm" page loads, as the first paint isn't the only one!

## ⏰ react-component-timing

React component timing is a tool that helps you get the above data, so that when you try to move the needle, you actually move it for your users.

- It lets you define what a **meaningful** paint is for a React app
- It breaks down timings by component, so that you can see how your app **progressively** loads.
- It provides timings via the [User timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) that are **easily comparible** across different experiences.
- It provides a pluggable layer that fits into your existing tools: New Relic, Google Analytics, etc.

### API

```jsx
import * as React from "react";
import { ReactComponentTimingProvider } from "react-component-timing";
import { newRelicIntegration } from "./new-relic-timing-reporter";
import withData from "./app-data-provider";

export class AppImpl extends React.Component {
  checkLoaded({ childTimings }) {
    /* We have access to the timings of all of the children, through some magic */
    return (
      childTimings.nav.loaded &&
      childTimings.article.loaded &&
      this.props.data.loaded
    );
  }

  render() {
    return (
      <ReactComponentTimingProvider reporter={newRelicIntegration}>
        <Page>
          <ReactComponentTiming
            componentName="page"
            checkLoaded={this.checkLoaded}
          >
            <Nav />
            <Content>
              <Article />
              <Comments />
            </Content>
          </ReactComponentTiming>
        </Page>
      </ReactComponentTimingProvider>
    );
  }
}

export const App = withData(AppImpl);
```

```jsx
import * as React from "react";
import { ReactCompomnentTiming } from "react-component-timing";
import { NavigationInner } from "./navigation-inner";
import withData from "./nav-data-provider";

class NavImpl extends React.Component {
  checkLoaded() {
    return this.props.data.loaded;
  }

  render() {
    return (
      <>
        <ReactCompomnentTiming
          componentName="nav"
          checkLoaded={this.checkLoaded}
        />
        <NavigationInner />
      </>
    );
  }
}

export const Nav = withData(NavImpl);
```

(And similar for Comments and Article, which would both include dynamically loaded data)

### API Concepts

#### Events

- Load: a component transitioned from "isLoading: false" -> true -> false. The time taken between falses is reported as a "load" event
  - Metadata:
    - Props given to the component during the transition
    - Page path
- Render: a component entered a render state

### How it would work

✨ Through some wizardry and probably some API changes from the above, I think it'd be possible to implement something that would build a picture of the timing of when these "timing" components got rendered, _and_ when they reported that they were loaded.

When props change (and are rerendered), a component can go into and out of a loading state. This loading state, and the reasons why, would be captured by the reporter.

This would let you define custom metrics, for, say, the comments component. You would be able to know a performance timing from cold page load to the comments being loaded, and how that is different on subsequent warm page loads.

The API also allows you to define "loading" states by composing your child loading states (possibly excluding some if they do not constitute "meaningful" for the parent component).

---

### Additional reading

- [Moving beyond window onload](http://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/)
- [Measuring performance of user experience](http://blog.patrickmeenan.com/2013/07/measuring-performance-of-user-experience.html)
- [User timing API](https://www.w3.org/TR/user-timing/)
  - [User timing shim](https://gist.github.com/pmeenan/5902672#file-user-timing-rum-js)

#### Goals for performance

For what targets to hit, the [rail](https://developers.google.com/web/fundamentals/performance/rail) guideline provides good information.

- Focus on the user.
- Respond to user input in under 100ms.
- Produce a frame in under 10ms when animating or scrolling.
- Maximize main thread idle time.
- Load interactive content in under 5000ms.

The RAIL framework:
_ Response
_ Animation
_ Idle
_ Load

This tool will help measure the Load and Response parts of this framework.
