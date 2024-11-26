import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import SignInViewForm from 'src/sections/auth/sign-in/sign-in-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Inicia sesion en - ${CONFIG.appName}`}</title>
      </Helmet>

      <SignInViewForm />
    </>
  );
}
