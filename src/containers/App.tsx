import React from "react";

import { initialState, reducer } from "../appState/reducer";
import { AppContext } from "./AppContext";
import { AppRoutes } from "./AppRoutes";

export const App = () => {
    const [appState, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            <AppRoutes />
        </AppContext.Provider>
    );
}
