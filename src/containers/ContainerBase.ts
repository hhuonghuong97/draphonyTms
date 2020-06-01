import { LocationState } from "history";
import { RouteComponentProps, StaticContext } from "react-router";

import { Action } from "../appState/Action";
import { IAppState } from "../appState/reducer";
import { __connect } from "./AppContext";

export {
    __connect as connect
}

export interface IStoreProps {
    appState: IAppState;

    /** Mounted automatically by connect(...)(...) */
    dispatch: React.Dispatch<Action>;
}

/**
 * Use this as base for creating your container's props type if you use {@link connectWithStore} to create the HoC.
 * 
 * @template P is the template for the route's parameters.
 *             https://reacttraining.com/react-router/web/example/url-params
 * @template C is the template for the static context.
 * @template S is the template for the location state object, which is used to pass information throught routes.
 *             https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md
 */
export type IRouterProps<P extends { [K in keyof P]?: string } = {}, C extends StaticContext = StaticContext, S = LocationState>
    = RouteComponentProps<P, C, S>;
    

export type IPageProps = IRouterProps & IStoreProps;
