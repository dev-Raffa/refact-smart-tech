import { AcessDenied } from "@/components/shared/access-denied";
import { PrivateLayout } from "@/layouts/private/private-layout";
import { PublicLayout } from "@/layouts/public/public-layout";
import { LoginForm } from "@/pages/auth/components/login-form";
import { BanksRulesTab } from "@/pages/banks";
import { DashboardPage } from "@/pages/dashboard";
import { PartnersPage } from "@/pages/partners/pages/partners";
import { OperatorsContent } from "@/pages/users";
import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
);

export const routers = createBrowserRouter([
    {
        path: 'login',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <LoginForm />
            }
        ]
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<PageLoader />}>
                <PrivateLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <BanksRulesTab />
            },
            {
                path: 'operators',
                element: <OperatorsContent />
            },
            {
                path: 'partners',
                element: <PartnersPage />
            }
        ]
    },
    {
        path: 'denied',
        element: <AcessDenied />
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
])

export function AppRouters() {
    return <RouterProvider router={routers} />;
}