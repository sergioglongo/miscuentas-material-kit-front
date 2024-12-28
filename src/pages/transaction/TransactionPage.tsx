import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import TransactionView from 'src/sections/transaction/TransactionView';

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> {`Transaccion - ${CONFIG.appName}`}</title>
      </Helmet>
    <TransactionView />
    </>
  );
}
