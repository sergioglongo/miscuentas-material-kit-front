import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import PayMethodView from 'src/sections/payMethod/PayMethodView';


// ----------------------------------------------------------------------

export default function PayMethodPage() {
  return (
    <>
      <Helmet>
        <title> {`Métodos de pago - ${CONFIG.appName}`}</title>
      </Helmet>

      {/* <CategoryView /> */}
      <PayMethodView />
    </>
  );
}
