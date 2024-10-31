import {Navigate, useRoutes} from "react-router-dom";
import {authRoutes} from "./auth.tsx";
import {mainRoutes} from "./main.tsx";
import {dashboardRoutes} from "./dashboard.tsx";

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to="/auth/login" replace />,
        },
        ...authRoutes,
        ...dashboardRoutes,
        ...mainRoutes,
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
