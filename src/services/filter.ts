import { inject, injectable } from "inversify";
import { observe } from "mobx";

import type { FilterParamsService } from "./filterParams";
import type { FilterResultService, SearchResult } from "./filterResult";

import { TYPES } from '../constants'

export interface FilterService {
    filterParamsState: FilterParamsService
    filterResultActions: FilterResultService

    readonly filter: () => Promise<void>
}

interface Disposable {
  dispose: () => void;
}

@injectable()
export default class Filter implements FilterService, Disposable {

    filterParamsState;
    filterResultActions;
    disposer;

    constructor (
        @inject(TYPES.filterParams) filterParamsState: FilterParamsService,
        @inject(TYPES.filterResult) filterResultActions: FilterResultService,
    ) {
        this.filterParamsState = filterParamsState
        this.filterResultActions = filterResultActions

        this.disposer = observe(filterParamsState.state,  () => {
            this.filter()
        })
    }

    filter = async () => {
        new Promise<SearchResult>((resolve) => {
            setTimeout(
                () =>
                    resolve({
                        data: [`Video Id ${100 * Math.random()}`, `Video Id ${100 * Math.random()}`, `Video Id ${100 * Math.random()}`],
                        totalCount: 1
                    }),
                1500
            );
        }).then((value) => this.filterResultActions.setResult(value));
    };

    dispose () {
        this.disposer()
    }
}
