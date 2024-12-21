import { Autocomplete, Box, Checkbox, FormHelperText, Select, Switch, TextField } from "@mui/material";

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

export const CheckboxRedux = ({ input, ...rest }: any) => (
  <Checkbox
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

export const SelectRedux = ({ input, children, ...rest }:any) => (
  <Select variant="standard" {...input} {...rest}>
    {children}
  </Select>
);

export const AutocompleteRedux = ({ input, children, ...rest }:any) => (
  <Autocomplete {...input} {...rest}>
    {children}
  </Autocomplete>
);

export const SwitchRedux = ({ input, ...rest }:any) => (
  <Switch
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);