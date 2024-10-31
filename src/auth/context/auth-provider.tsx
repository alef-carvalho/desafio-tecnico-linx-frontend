import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import {AuthToken} from "./types";
import { AuthContext } from './auth-context';
import {AuthContextType, AuthUser} from "../types.ts";
import {clearSession, getAccessToken, isValidToken, saveAccessToken} from './utils';
import {sendGetAsync, sendPostAsync} from "../../infra/Api";

export type AuthState = {
    user: AuthUser | null;
    status?: string;
    loading: boolean;
};

enum Action {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthAction = {
    type: Action;
    payload: {
        user: AuthUser | null
    };
}

const reducer = (state: AuthState, { payload, type }: AuthAction): AuthState => {
    switch (type) {
        case Action.INITIAL:
            return {...state, loading: false, user: payload.user };
        case Action.LOGIN:
            return {...state, user: payload.user};
        case Action.LOGOUT:
            return {...state, user: null };
    }
    return state;
};


type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {

    const [state, dispatch] = useReducer(reducer, {
        user: null,
        loading: true
    });

    const fetchUser = useCallback(async () => {
        try {
            const token = getAccessToken();

            if (token && isValidToken(token)) {

                const user = await sendGetAsync<AuthUser>('auth/me');

                dispatch({
                    type: Action.INITIAL,
                    payload: { user },
                });

            } else {
                dispatch({
                    type: Action.INITIAL,
                    payload: { user: null },
                });
            }
        } catch (error) {
            dispatch({
                type: Action.INITIAL,
                payload: { user: null },
            });
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // LOGIN
    const login = useCallback(async (email: string, password: string) => {

        const { accessToken } = await sendPostAsync<AuthToken>('auth', {
            email,
            password,
        });

        saveAccessToken(accessToken);

        await fetchUser()

    }, [fetchUser]);

    // LOGOUT
    const logout = useCallback(async () => {
        clearSession();
        dispatch({
            type: Action.LOGOUT,
            payload: {
                user: null
            }
        });
    }, []);


    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo<AuthContextType>(
        () => ({
            user: state.user,
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
            //
            login,
            logout
        }),
        [login, logout, state.user, status]
    );

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
}
