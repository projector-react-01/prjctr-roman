import { connect } from "../../HOC/Injector";

import { TYPES } from "../../../constants";
import { LibraryWrapper } from "./LibraryView";

type Props = {}

interface FilterService {
    readonly filter: () => Promise<void>
    readonly dispose: () => void
}

type LibraryViewModel = {
    readonly filter: () => void
    readonly dispose: () => void
}

export const createLibraryViewModel = (filterService: FilterService) => {
    return {
        filter: filterService.filter,
        dispose: filterService.dispose
    }
}

export const Library = connect<Props, {}, LibraryViewModel>(LibraryWrapper, TYPES.filterService)
