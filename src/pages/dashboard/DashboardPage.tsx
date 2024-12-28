import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import DashboardView from 'src/sections/dashboard/DashboardView';


// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> {`Inicio - ${CONFIG.appName}`}</title>
      </Helmet>
        <DashboardView />
      {/* <CategoryView /> */}
      {/* <PayMethodView /> */}
    </>
  );
}
