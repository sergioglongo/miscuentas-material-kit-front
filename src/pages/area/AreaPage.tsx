import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import AreaView from 'src/sections/area/AreaView';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Areas - ${CONFIG.appName}`}</title>
      </Helmet>

      <AreaView />
    </>
  );
}
