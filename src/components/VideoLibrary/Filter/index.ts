import { ComposeFunction, connect } from "../../HOC/Injector";
import { FilterView, FilterViewProps } from "./FilterView";
import { TYPES } from "../../../constants";
import { Category, Direction, Format, Level } from "../../../types/filter";
import { useDependency } from "../../../hooks/useDependency";
import { action, observable } from "mobx";

export interface FilterParamsProps {
    readonly category: Category,
    readonly direction: Direction,
    readonly format: Format,
    readonly level: Level,
    readonly query: string,
    readonly page: number
}

export interface FilterParamsState {
    state: FilterParamsProps
}

export interface FilterParamsActions {
    readonly setCategory: (category: string) => void
    readonly setDirection: (direction: string) => void
    readonly setFormat: (format: string) => void
    readonly setLevel: (level: string) => void
    readonly setQuery: (query: string) => void
    readonly setPage: (page: number) => void
    readonly reset: () => void
}

export type FilterParamsService = FilterParamsState & FilterParamsActions

type Props = {}

export function composeFilterViewModel(filterParamsState: FilterParamsService,): ComposeFunction<Props, FilterViewProps> {
    return () => {
        const { state } = filterParamsState
        const observableProps = state;

        const onCategoryChange = action((e: string) => filterParamsState.setCategory(e))
        const onDirectionChange = action((e: string) => filterParamsState.setDirection(e))
        const onFormatChange = action((e: string) => filterParamsState.setFormat(e))
        const onLevelChange = action((e: string) => filterParamsState.setLevel(e))

        return {
            props: observableProps,
            actions: {
                onCategoryChange,
                onDirectionChange,
                onFormatChange,
                onLevelChange
            }
        };
    };
}

const Filter = connect<Props, FilterViewProps>(FilterView, () => useDependency(TYPES.filterViewModel))
export {
    Filter
}
