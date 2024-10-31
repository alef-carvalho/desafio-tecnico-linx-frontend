import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from '../../auth/guard';

const IndexPage = lazy(() => import('../../pages/dashboard'));
const PetsPage = lazy(() => import('../../pages/dashboard/pets'));

export const dashboardRoutes = [
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <Outlet />
            </AuthGuard>
        ),
        children: [
            { element: <IndexPage />, index: true },
            {
                path: 'pets',
                children: [
                    {
                        path: '',
                        element: <PetsPage />
                    },
                ]
            },
        ],
    },
];
