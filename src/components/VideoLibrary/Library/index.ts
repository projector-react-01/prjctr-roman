import { ComposeFunction, connect } from "../../HOC/Injector";

import { TYPES } from "../../../constants";
import { LibraryViewProps, LibraryWrapper } from "./LibraryView";
import { useDependency } from "../../../hooks/useDependency";
import { action } from "mobx";

interface FilterService {
    readonly filter: () => void
    readonly dispose: () => void
}

type Props = {}

export function composeLibraryViewModel(filterService: FilterService): ComposeFunction<Props, LibraryViewProps> {
    return () => {
        const filter = action(() => filterService.filter())
        const dispose = action(() => filterService.dispose())
        return {
            props: {},
            actions: {
                filter,
                dispose
            }
        };
    };
}

const Library = connect<Props, LibraryViewProps>(LibraryWrapper, () => useDependency(TYPES.libraryViewModel))
export {
    Library
}
