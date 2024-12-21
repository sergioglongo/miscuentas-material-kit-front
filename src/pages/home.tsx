import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { IUserState } from 'src/config/types/types';

import { OverviewAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

function Page({user}:any) {
  const router = useRouter();

  useEffect(() => {
    if(user?.isAuthorized){
      console.log("autorizado", user?.isAuthorized);
    } else {
      console.log("no autorizado",user?.isAuthorized);
      router.push('/sign-in');
    }
    
  },[user?.isAuthorized, router])

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

      <OverviewAnalyticsView />
    </>
  );
}

const PageRedux = connect(
  (state: any) => ({
      user: state.user
  }),
)(Page);

export default PageRedux;