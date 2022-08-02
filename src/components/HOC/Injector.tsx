import React, { useContext } from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import Context from './Context'
import { interfaces } from "inversify";

type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export type ComposeFunctionOutput<VP extends {}> = {
    readonly props: NonFunctionProperties<VP>;
    readonly actions: FunctionProperties<VP>;
};

export type ComposeFunction<P extends {}, VP extends {}, VM extends {}> = (
    props: P,
    viewModelProps: VM,
) => ComposeFunctionOutput<VP>;

export function connect<P extends {}, VP extends {}, VM extends {}>(
    view: React.FC<VP & VM>,
    dependencyName: interfaces.ServiceIdentifier<VM>,
    composeFunction?: ComposeFunction<P, VP, VM>
): React.FC<P> {
    return observer((props) => {
        const container = useContext(Context)
        if (!container) {
            throw Error('application must be wrapped with DI container')
        }
        const viewModelProps: VM = container.get(dependencyName)

        if (typeof composeFunction !== 'function') {
            const nextState = {
                ...props as unknown as VP,
                ...viewModelProps
            }

            return view(nextState)
        }

        const [{ props: viewProps, actions }] = useState(() =>
            composeFunction(props, viewModelProps)
        );
        const [state] = useState(() => viewProps);

        const nextState = {
            ...state,
            ...viewModelProps,
            ...actions
        } as VP & VM;

        return view(nextState);
    });
}
