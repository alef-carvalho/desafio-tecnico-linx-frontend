import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from '../../auth/guard';
import DashboardLayout from "../../layouts/dashboard";

const IndexPage = lazy(() => import('../../pages/dashboard'));
const PetsPage = lazy(() => import('../../pages/dashboard/pets'));

export const dashboardRoutes = [
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
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
