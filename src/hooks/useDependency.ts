import { useContext, useState } from "react";
import Context from "../components/HOC/Context";
import { interfaces } from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;

export function useDependency<T> (dependencyName: ServiceIdentifier<T>): T {
    const container = useContext(Context)
    if (!container) {
        throw Error('application must be wrapped with DI container')
    }
    const [dependency] = useState(() =>container.get(dependencyName))

    return dependency
}
