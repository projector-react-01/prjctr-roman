import { inject, injectable } from "inversify";
import { TYPES } from "../../constants";
import { IAccountService } from "./account";
import { IAuthService } from "./auth";

interface RegistrationProps {
    readonly username: string;
    readonly password: string;
}

export interface ISignUpService {
    authService: IAuthService
    accountService: IAccountService
    readonly register: (props: RegistrationProps) => Promise<void>
}

@injectable()
export class SignUpService implements ISignUpService {
    authService: IAuthService
    accountService: IAccountService

    constructor(
        @inject(TYPES.authService) authService: IAuthService,
        @inject(TYPES.accountService) accountService: IAccountService,
    ) {
        this.authService = authService
        this.accountService = accountService
    }

    async register (props: RegistrationProps): Promise<void> {
        const account = await this.authService.register(props)
        if (account) {
            this.accountService.setAccount(account)
        }
    }
}
