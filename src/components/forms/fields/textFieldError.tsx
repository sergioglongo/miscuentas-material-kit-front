import { Box, FormHelperText, TextField } from "@mui/material";

export const TextFieldErrorRedux = ({ meta: { touched, error }, input, ...rest }: any) => (
    <Box>
      <TextField
        variant="standard"
        fullWidth
        {...rest}
        {...input}
        error={touched && Boolean(error)}
      />
      {touched && error && error !== 'Required' && <FormHelperText style={{ position: 'absolute', bottom: '-22px', color: '#d32f2f' }}>{error}</FormHelperText>}
    </Box>
  );