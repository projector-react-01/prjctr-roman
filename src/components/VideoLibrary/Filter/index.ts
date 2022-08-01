import { connect } from "../../HOC/Injector";
import { FilterView } from './FilterView'
import { TYPES } from "../../../constants";
import { Category, Direction, Format, Level } from "../../../types/filter";

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
    readonly setCategory: (category: Category) => void
    readonly setDirection: (direction: Direction) => void
    readonly setFormat: (format: Format) => void
    readonly setLevel: (level: Level) => void
    readonly setQuery: (query: string) => void
    readonly setPage: (page: number) => void
    readonly reset: () => void
}

export type FilterParamsService = FilterParamsState & FilterParamsActions

export const createFilterViewModel = (
    filterParamsState: FilterParamsService,
) => {
    const { state } = filterParamsState
    return {
        category: state.category,
        direction: state.direction,
        format: state.format,
        level: state.level,
        onCategoryChange: filterParamsState.setCategory,
        onDirectionChange: filterParamsState.setDirection,
        onFormatChange: filterParamsState.setFormat,
        onLevelChange: filterParamsState.setLevel,
    }
}

export const Filter = connect(FilterView, TYPES.filterViewModel)
