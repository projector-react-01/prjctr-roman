import { ComposeFunction, connect } from "../HOC/Injector";

import { TYPES } from "../../constants";
import { AuthViewProps, AuthWrapper } from "./AuthView";
import { Account } from "../../services/auth/account";
import { action, observable } from "mobx";
import { useDependency } from "../../hooks/useDependency";

type AccountService = {
    readonly isLoggedIn: false;
} |
    {
        readonly isLoggedIn: true;
        readonly account: Account;
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
    return () => {
        const state = observable({
            username: '',
            password: '',
            isLoggedIn: accountService.isLoggedIn,
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

const Auth = connect<Props, AuthViewProps>(AuthWrapper, () => useDependency(TYPES.authViewModel))
export {
    Auth
}
