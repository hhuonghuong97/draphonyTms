import React from "react";
import ReactDOM from "react-dom";

import { App } from "./containers/App";

ReactDOM.render(
    <App />,
    document.getElementById("app")
);


/**
 * Required to enable HMR with webpack dev server
 * @see https://github.com/JeffreyWay/laravel-mix/issues/2093
 */
const hotModule: NodeModule & { accept: () => void } = (module as any).hot;
if (process.env.NODE_ENV === "development" && hotModule) {
    // console.info(hotModule);
    hotModule.accept();
}
