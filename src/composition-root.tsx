import { interfaces } from 'inversify'

import { createAxiosInstance } from "./services/api/create-axios-instance";
import { ApiService } from "./services/api/api";
import type { IApiService } from "./services/api/api";

import { AuthService } from "./services/auth/auth";
import type { IAuthService } from "./services/auth/auth";
import { AccountService } from "./services/auth/account";
import type { IAccountService } from "./services/auth/account";
import { SignUpService } from "./services/auth/signUp";
import type { ISignUpService } from "./services/auth/signUp";
import { SignInService } from "./services/auth/signIn";
import type { ISignInService } from "./services/auth/signIn";

import FilterParams from "./services/filterParams";
import type { FilterParamsService } from "./services/filterParams";

import FilterResult from "./services/filterResult";
import type { FilterResultService } from "./services/filterResult";

import Filter from "./services/filter";
import type { FilterService } from "./services/filter";

import { createLibraryViewModel } from "./components/VideoLibrary/Library";
import { createFilterViewModel } from "./components/VideoLibrary/Filter";
import { createVideoViewModel } from "./components/VideoLibrary/Video";
import { createAuthViewModel } from "./components/Auth";

import { TYPES } from "./constants";

export default function createCompositionRoot (container: interfaces.Container) {
    container.bind(TYPES.axiosInstance).toDynamicValue(() => createAxiosInstance())
    container.bind<IApiService>(TYPES.apiService).to(ApiService).inSingletonScope()

    container.bind<IAuthService>(TYPES.authService).to(AuthService).inSingletonScope()
    container.bind<IAccountService>(TYPES.accountService).to(AccountService).inSingletonScope()

    container.bind<ISignUpService>(TYPES.signUpService).to(SignUpService).inSingletonScope()
    container.bind<ISignInService>(TYPES.signInService).to(SignInService).inSingletonScope()

    container.bind(TYPES.authViewModel).toDynamicValue(({ container }) => createAuthViewModel(container.get(TYPES.accountService), container.get(TYPES.signInService)))
    container.bind(TYPES.axiosInstance).toDynamicValue(() => createAxiosInstance())
    container.bind<IApiService>(TYPES.apiService).to(ApiService)

    container.bind<FilterParamsService>(TYPES.filterParams).to(FilterParams).inSingletonScope()
    container.bind(TYPES.filterViewModel).toDynamicValue(({ container }) => createFilterViewModel(container.get(TYPES.filterParams)))

    container.bind<FilterResultService>(TYPES.filterResult).to(FilterResult).inSingletonScope()
    container.bind(TYPES.videoViewModel).toDynamicValue(({ container }) => createVideoViewModel(container.get(TYPES.filterResult)))

    container.bind<FilterService>(TYPES.filterService).to(Filter).inSingletonScope()
    container.bind(TYPES.libraryViewModel).toDynamicValue(({ container }) => createLibraryViewModel(container.get(TYPES.filterService)))
    return container
}
