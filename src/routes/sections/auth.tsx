import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import {GuestGuard} from "../../auth/guard";

const LoginPage = lazy(() => import('../../pages/auth/login'));

export const authRoutes = [
    {
        path: 'auth',
        element: (
            <Suspense fallback={(<>Carregando...</>)}>
                <Outlet />
            </Suspense>
        ),
        children: [
            {
                path: 'login',
                element: (
                    <GuestGuard>
                        <LoginPage/>
                    </GuestGuard>
                ),
            },
        ],
    },
];
