import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function BasicCard(props: any) {
    //   const { classes } = useStyles();
    const {
        children,
        width = '100%',
        height = 'auto',
    } = props;

    return (
        <Card sx={{width, height}}>
            <CardContent>
               {children}
            </CardContent>
        </Card>
    );
}

export default BasicCard;
