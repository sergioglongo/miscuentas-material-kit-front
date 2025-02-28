import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import DashboardLayout from 'src/layouts/dashboard/layout';
import ProfileEditViewForm from 'src/sections/user/profile/profile-edit-view';
import { connect } from 'react-redux';
import UnitEditViewForm from 'src/sections/user/profile/unit-edit-view';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const DashboardPage = lazy(() => import('src/pages/dashboard/DashboardPage'));

export const AreaPage = lazy(() => import('src/pages/area/AreaPage'));
export const AreaEdit = lazy(() => import('src/sections/area/AreaCreateEditView'));

export const AccountPage = lazy(() => import('src/pages/account/AccountPage'));
export const AccountEdit = lazy(() => import('src/sections/account/AccountCreateEditView'));
export const AccountTransactions = lazy(() => import('src/sections/account/AccountTransactionsView'));

export const PayMethodPage = lazy(() => import('src/pages/payMethod/PayMethodPage'));
export const PayMethodEdit = lazy(() => import('src/sections/payMethod/PayMethodCreateEditView'));

export const CategoryPage = lazy(() => import('src/pages/category/CategoryPage'));
export const CategoryEdit = lazy(() => import('src/sections/category/CategoryCreateEditView'));

export const TransactionPage = lazy(() => import('src/pages/transaction/TransactionPage'));
export const TransactionEdit = lazy(() => import('src/sections/transaction/TransactionCreateEditView'));
// export const PaymentEdit = lazy(() => import('src/sections/transaction/PaymentCreateEditView'));
// export const IncomeEdit = lazy(() => import('src/sections/transaction/IncomeCreateEditView'));

export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/login/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/login/sign-up'));

export const ProductsPage = lazy(() => import('src/pages/products'));
export const BlogPage = lazy(() => import('src/pages/blog'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

function RouterAutorized({user}:any) {
  const isAuthorized = user?.isAuthorized;

  return useRoutes([
    {
      element: isAuthorized ? (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/sign-in" replace />
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'area', element: <AreaPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'account', element: <AccountPage /> },
        { path: 'paymethod', element: <PayMethodPage /> },
        { path: 'transaction', element: <TransactionPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profileEdit', element: <ProfileEditViewForm /> },
        { path: 'unitEdit', element: <UnitEditViewForm /> },
        { path: 'areaEdit', element: <AreaEdit /> },
        { path: 'categoryEdit', element: <CategoryEdit /> },
        { path: 'accountEdit', element: <AccountEdit /> },
        { path: 'accountTransactions', element: <AccountTransactions /> },
        { path: 'payMethodEdit', element: <PayMethodEdit /> },
        { path: 'transactionEdit', element: <TransactionEdit /> },
        // { path: 'paymentEdit', element: <PaymentEdit /> },
        // { path: 'incomeEdit', element: <IncomeEdit /> },
      ],
    },
    {
      path: 'sign-in',
      element: isAuthorized ? (
        <Navigate to="/" replace />
      ) : (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
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
}

const Router = connect(
  (state: any) => ({
      user: state.user
  }),
)(RouterAutorized);

export default Router;