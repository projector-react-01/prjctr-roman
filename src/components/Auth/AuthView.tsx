import React  from "react";

interface AuthViewProps {
    isLoggedIn: boolean,
    username: string;
    password: string;
    setUsername: (prop: string) => void,
    setPassword: (prop: string) => void,
    login: () => void
}

export const AuthWrapper = ({ isLoggedIn, username, password, setUsername, setPassword, login }: AuthViewProps) => {
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
