import React  from "react";

export type AuthViewProps = {
    readonly username: string;
    readonly password: string;
    readonly setUsername: (prop: string) => void;
    readonly setPassword: (prop: string) => void;
    readonly login: () => void;
    readonly isLoggedIn: boolean;
};

export const AuthWrapper = ({ isLoggedIn, username, password, setUsername, setPassword, login }: AuthViewProps & AuthViewModel) => {
    return (
        <>
            <h1>isLoggedIn: {isLoggedIn ? 'Authenticated' : 'Unauthenticated'}</h1>
            <input
                value={username}
                type="text"
                onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            />
            <input
                value={password}
                type="password"
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
            <button onClick={login}>doLogin</button>
        </>
    );
};
