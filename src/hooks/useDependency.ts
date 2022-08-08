import { useContext } from "react";
import Context from "../components/HOC/Context";
import { interfaces } from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;

export function useDependency<VP> (dependencyName: ServiceIdentifier<VP>): VP {
    const container = useContext(Context)
    if (!container) {
        throw Error('application must be wrapped with DI container')
    }
    return container.get(dependencyName)
}
