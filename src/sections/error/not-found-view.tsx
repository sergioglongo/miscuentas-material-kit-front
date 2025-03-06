import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          La página que buscas no existe
        </Typography>

        {/* <Typography sx={{ color: 'text.secondary' }}>
         
        </Typography> */}

        <Box
          component="img"
          src="/assets/illustrations/illustration-404.svg"
          sx={{
            width: 320,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button component={RouterLink} href="/" size="large" variant="contained" color="inherit">
          Volver al inicio
        </Button>
      </Container>
    </SimpleLayout>
  );
}
