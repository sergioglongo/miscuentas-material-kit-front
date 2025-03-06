import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import InitWizardView from 'src/sections/auth/sign-in/InitWizardView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box maxWidth="lg">
      <Helmet>
        <title> {`Asistente de inicialización - ${CONFIG.appName}`}</title>
      </Helmet>

      <InitWizardView />
    </Box>
  );
}