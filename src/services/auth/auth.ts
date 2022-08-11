import { TYPES } from "../../constants";
import { inject, injectable } from "inversify";
import { Account } from "./account";
import { IApiService } from "../api/api";
import { makeObservable, observable } from "mobx";

interface AuthState {
    errors: string[]
}

export type IAuthService = {
    apiService: IApiService
    state: AuthState
    readonly register: (props: RegistrationProps) => Promise<Account | void>
    readonly login: (props: RegistrationProps) => Promise<Tokens | void>
    readonly logout: () => Promise<SuccessLogout | void>
    refreshToken: () => Promise<Pick<Tokens, 'access_token'> | void>
}

interface RegistrationProps {
    readonly username: string;
    readonly password: string;
}

interface SuccessLogout {
    msg: string
}

export type Tokens = {
    access_token: string;
    refresh_token: string;
};

@injectable()
export class AuthService implements IAuthService {
    state: AuthState = {
        errors: []
    }
    apiService: IApiService

    constructor(@inject(TYPES.apiService) apiService: IApiService) {
        makeObservable(this, {
            state: observable
        });
        this.apiService = apiService
        this.refreshToken()
    }

    setErrorState (errMessage: string) {
        const newErrors = this.state.errors
        newErrors.push(errMessage)
        this.state = {
            ...this.state,
            errors: newErrors
        }
    }

    async register (props: RegistrationProps): Promise<Account | void> {
        try {
            return await this.apiService.post<RegistrationProps, Account>('/api/auth/register', props)
        } catch (e) {
            if (e instanceof Error) {
                this.setErrorState(e.message)
            }
        }
    }

    async login (props: RegistrationProps): Promise<Tokens | void> {
        try {
            return await this.apiService.post<RegistrationProps, Tokens>('/api/auth/login', props);
        } catch (e) {
            if (e instanceof Error) {
                this.setErrorState(e.message)
            }
        }

    }

    async logout (): Promise<SuccessLogout | void> {
        try {
            return this.apiService.post('/api/auth/logout')
        } catch (e) {
            if (e instanceof Error) {
                this.setErrorState(e.message)
            }
        }
    }

    async refreshToken (): Promise<Pick<Tokens, 'access_token'> | void> {
        try {
            return this.apiService.post('/api/auth/refresh')
        } catch (e) {
            if (e instanceof Error) {
                this.setErrorState(e.message)
            }
        }
    }
}
