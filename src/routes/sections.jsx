import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import RegisterView from 'src/pages/register';
import DashboardLayout from 'src/layouts/dashboard';

import IncomePage from 'src/sections/income/view/income-view';
import ExpensePage from 'src/sections/expense/view/expense-view';
import IncomeCategoryPage from 'src/sections/incomeCategory/view/incomeCategory-view';
import ExpenseCategoryPage from 'src/sections/expenseCategory/view/expenseCategory-view';

import ProtectedRoute from './ProtectedRoute';


export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute> 
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element:<ProtectedRoute> <IndexPage /></ProtectedRoute>, path:"dashboard" },

        { path: 'user', element: <UserPage /> },
        { path: 'admin', element: <IndexPage /> },
        { path: 'expense', element: <ProtectedRoute><ExpensePage /></ProtectedRoute> },
        { path: 'income', element:<ProtectedRoute><IncomePage /></ProtectedRoute>  },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'income-category', element:<ProtectedRoute> <IncomeCategoryPage /></ProtectedRoute> },
        { path: 'expense-category', element:<ProtectedRoute><ExpenseCategoryPage /></ProtectedRoute>  },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterView />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
