import React from "react";

/**
 * We just need the reference to the AppContext.
 * Initialization is done via AppContext.Provider so, we skip setting value and state type here.
 */
export const AppContext = React.createContext({});

/**
 * Don't let other containers import this file.
 * !!!Use ContainerBase.ts instead!!!
 * @param component 
 */
export function __connect<TProps>(component: React.ComponentType<TProps>) {
    return (props: TProps) => {
        return (
            <AppContext.Consumer>
                {
                    bswpm => React.createElement(component, {
                        ...props,
                        ...bswpm
                    })
                }
            </AppContext.Consumer>
        );
    }
}
