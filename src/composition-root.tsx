import { interfaces } from 'inversify'

import { createAxiosInstance } from "./services/api/create-axios-instance";
import { ApiService } from "./services/api/api";
import type { IApiService } from "./services/api/api";

import FilterParams from "./services/filterParams";
import type { FilterParamsService } from "./services/filterParams";

import FilterResult from "./services/filterResult";
import type { FilterResultService } from "./services/filterResult";

import Filter from "./services/filter";
import type { FilterService } from "./services/filter";

import { createLibraryViewModel } from "./components/VideoLibrary/Library";
import { createFilterViewModel } from "./components/VideoLibrary/Filter";
import { createVideoViewModel } from "./components/VideoLibrary/Video";

import { TYPES } from "./constants";

export default function createCompositionRoot (container: interfaces.Container) {
    container.bind(TYPES.axiosInstance).toDynamicValue(() => createAxiosInstance())
    container.bind<IApiService>(TYPES.apiService).to(ApiService)

    container.bind<FilterParamsService>(TYPES.filterParams).to(FilterParams).inSingletonScope()
    container.bind(TYPES.filterViewModel).toDynamicValue(({ container }) => createFilterViewModel(container.get(TYPES.filterParams)))

    container.bind<FilterResultService>(TYPES.filterResult).to(FilterResult).inSingletonScope()
    container.bind(TYPES.videoViewModel).toDynamicValue(({ container }) => createVideoViewModel(container.get(TYPES.filterResult)))

    container.bind<FilterService>(TYPES.filterService).to(Filter)
    container.bind(TYPES.libraryViewModel).toDynamicValue(({ container }) => createLibraryViewModel(container.get(TYPES.filterService)))
    return container
}
