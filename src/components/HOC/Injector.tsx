import React  from "react";
import { observer } from "mobx-react";
import { useState } from "react";

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

export type ComposeFunction<P extends {}, VP extends {}> = (
    props: P
) => ComposeFunctionOutput<VP>;

export function connect<P extends {}, VP extends {}>(
    view: React.FC<VP>,
    viewModelProvider: () => (props: P) => ComposeFunctionOutput<VP>
): React.FC<P> {
    return observer((props) => {
        const dependency = viewModelProvider()
        const [{ props: viewProps, actions }] = useState(() =>
            dependency(props)
        );
        const [state] = useState(() => viewProps);

        const nextState = {
            ...state,
            ...actions
        } as VP;

        return view(nextState);
    });
}
