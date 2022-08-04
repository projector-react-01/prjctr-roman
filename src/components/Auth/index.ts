import { ComposeFunction, connect } from "../HOC/Injector";

import { TYPES } from "../../constants";
import { AuthViewProps, AuthWrapper } from "./AuthView";
import { Account } from "../../services/auth/account";
import { action, observable } from "mobx";

type AccountState = {
    readonly isLoggedIn: false;
} |
    {
        readonly isLoggedIn: true;
        readonly account: Account;
    }

interface AccountService {
    state: AccountState
}

interface RegistrationProps {
    username: string;
    password: string;
}

interface SignInService {
    login: (props: RegistrationProps) => Promise<void>
}

type Props = {};

export function composeAuthViewModel(
    accountService: AccountService,
    signInService: SignInService
): ComposeFunction<Props, AuthViewProps> {
    return (_) => {

        const state = observable({
            username: '',
            password: '',
            isLoggedIn: accountService.state.isLoggedIn,
        });

        const setUsername = action((prop: string) => {
            state.username = prop
        });
        const setPassword = action((prop: string) => {
            state.password = prop
        });

        const login = action(() => {
            signInService.login({ username: state.username, password: state.password })
        })

        return {
            props: state,
            actions: {
                setUsername,
                setPassword,
                login
            }
        };
    };
}

const Auth = connect<Props, AuthViewProps>(AuthWrapper, TYPES.authViewModel)
export {
    Auth
}
