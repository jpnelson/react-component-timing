import * as React from "react";
import * as ReactDOM from "react-dom";
import pp from "./app";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
