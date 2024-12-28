import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import AccountView from 'src/sections/account/AccountView';

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> {`Cuentas - ${CONFIG.appName}`}</title>
      </Helmet>

      <AccountView />
    </>
  );
}
