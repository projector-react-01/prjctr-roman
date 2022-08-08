import { inject, injectable } from "inversify";
import { TYPES } from "../../constants";
import { IApiService } from "../api/api";
import { computed, makeObservable, observable } from "mobx";

export interface Account {
    readonly id: string;
    readonly lastName: string;
    readonly firstName: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly subscribed: boolean;
    readonly subscribeExpireDate: Date | null;
}

export interface IAccountService {
    state: Account | null;
    isLoggedIn: boolean;

    apiService: IApiService

    init: () => Promise<void>
    getAccount: () => Account | null
    setAccount: (state: Account | null) => void
    fetchAccount: () => Promise<Account>
}

@injectable()
export class AccountService implements IAccountService {
    state: Account | null = null
    apiService: IApiService

    constructor(
        @inject(TYPES.apiService) apiService: IApiService
    ) {
        makeObservable(this, {
            state: observable,
            isLoggedIn: computed,
        })
        this.apiService = apiService
        this.init()
    }

    async init () {
        const account = await this.fetchAccount()
        this.setAccount(account)
    }

    get isLoggedIn () {
        return this.state !== null
    }

    getAccount () {
        return this.isLoggedIn ? this.state : null
    }

    setAccount (state: Account | null) {
        this.state = state
    }

    async fetchAccount () {
        return this.apiService.get<Account>('/me')
    }
}
