import { ComposeFunction, connect } from "../HOC/Injector";

import { TYPES } from "../../constants";
import { AuthWrapper } from "./AuthView";
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

interface AuthViewModelFactory {
    isLoggedIn: boolean,
    login: (props: RegistrationProps) => Promise<void>
}

export const createAuthViewModel = (
    accountService: AccountService,
    signInService: SignInService
) => {
    return {
        isLoggedIn: accountService.state.isLoggedIn,
        login: signInService.login.bind(signInService)
    }
}

type Props = {};

export type ViewProps = {
    readonly username: string;
    readonly password: string;
    readonly setUsername: (prop: string) => void;
    readonly setPassword: (prop: string) => void;
    readonly login: () => void
};

function composeAppStreams(): ComposeFunction<Props, ViewProps, AuthViewModelFactory> {
    return (_, authViewModel) => {
        const state = observable({
            username: '',
            password: '',
        });

        const setUsername = action((prop: string) => {
            state.username = prop
        });
        const setPassword = action((prop: string) => {
            state.password = prop
        });

        const login = action(() => {
            authViewModel.login({ username: state.username, password: state.password })
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

const Auth = connect(AuthWrapper, TYPES.authViewModel, composeAppStreams())
export {
    Auth
}
