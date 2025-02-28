import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';

import { CONFIG } from 'src/config-global';
import DashboardPage from './dashboard/DashboardPage';

// ----------------------------------------------------------------------

function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>
      <DashboardPage />
    </>
  );
}

const PageRedux = connect(
  (state: any) => ({
      user: state.user
  }),
)(Page);

export default PageRedux;