import { makeObservable, observable } from "mobx";
import { Category, Direction, Format, Level } from "../types/filter";
import { injectable } from "inversify";

export interface FilterParamsProps {
    category: Category,
    direction: Direction,
    format: Format,
    level: Level,
    query: string,
    page: number
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

@injectable()
export default class FilterParams implements FilterParamsService {
    state: FilterParamsProps = {
        category: Category.ALL,
        direction: Direction.ALL,
        format: Format.ALL,
        level: Level.ANY,
        query: '',
        page: 1
    }

    constructor() {
        makeObservable(this, {
            state: observable
        });
    }

    setCategory = (category: Category) => {
        this.reset();
        this.state.category = category
    };

    setDirection = (direction: Direction) => {
        this.state.direction = direction
    };

    setFormat = (format: Format) => {
        this.state.format = format
    }

    setLevel = (level: Level) => {
        this.state.level = level
    }

    setQuery = (query: string) => {
        this.state.query = query
    };

    setPage = (page: number) => {
        this.state.page = page
    };

    reset = () => {
        this.state.category = Category.ALL
        this.state.direction = Direction.ALL
        this.state.format = Format.ALL
        this.state.level = Level.ANY
        this.state.query = ''
        this.state.page = 1
    };
}
