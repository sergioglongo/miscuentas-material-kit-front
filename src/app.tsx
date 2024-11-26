import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';
import { store, persistor } from 'src/redux/store';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <Router />
        {/* {githubButton} */}
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
