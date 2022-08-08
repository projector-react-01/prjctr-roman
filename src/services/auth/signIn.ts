import { inject, injectable } from "inversify";
import { TYPES } from "../../constants";
import { IAccountService } from "./account";
import { IAuthService } from "./auth";

interface LoginProps {
    username: string
    password: string
}

export interface ISignInService {
    readonly login: (props: LoginProps) => Promise<void>
    readonly logout: () => void
}

@injectable()
export class SignInService implements ISignInService {
    authService: IAuthService
    accountService: IAccountService

    constructor(
        @inject(TYPES.authService) authService: IAuthService,
        @inject(TYPES.accountService) accountService: IAccountService,
    ) {
        this.authService = authService
        this.accountService = accountService
    }

    async login (props: LoginProps): Promise<void> {
        await this.authService.login(props)

        const account = await this.accountService.fetchAccount()
        this.accountService.setAccount(account)
    }

    async logout (): Promise<void> {
        await this.authService.logout()
        this.accountService.setAccount(null)

    }
}
