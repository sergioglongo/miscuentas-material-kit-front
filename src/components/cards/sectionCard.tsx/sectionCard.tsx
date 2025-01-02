import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Divider } from '@mui/material';
import CommonIcon from 'src/components/icon/CommonIcons';

function SectionCard(props: any) {
    //   const { classes } = useStyles();
    const {
        children,
        width = '100%',
        height = 'auto',
        titleAlign = 'center',
        title = 'Sin titulo',
        subtitle = 'Sin subtitulo',
        iconName,
        iconSize = 40,
        iconColor = 'gray'
    } = props;

    return (
        <Card sx={{ width, height }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative' }}>
                    {iconName &&
                        <Box style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))', position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}>
                            <CommonIcon iconName={iconName} styles={{ fontSize: iconSize, display: 'flex', color: iconColor }} />
                        </Box>
                    }
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h3'>{title}</Typography>
                        <Typography variant="subtitle1">{subtitle}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ borderStyle: 'fill', my: 2 }} />

                {children}
            </CardContent>
        </Card>
    );
}

export default SectionCard;
