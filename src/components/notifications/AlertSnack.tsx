import { forwardRef } from "react";
import MuiAlert from '@mui/material/Alert';

export const AlertSnack: any = forwardRef(function Alert(props, ref: any) { // eslint-disable-line
    return <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
    />;
});