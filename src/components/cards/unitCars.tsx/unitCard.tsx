import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, CardHeader, CardMedia, MenuItem, IconButton, Popover, Grid } from '@mui/material';
import { IUnit } from 'src/config/types/types';
import { fDateSlash } from 'src/utils/format-time';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import UnitIcon from 'src/components/icon/unit-icons';
import CommonIcon from 'src/components/icon/CommonIcons';

interface UnitCardProps {
    unit: IUnit;
    width?: string;
    height?: string;
    maxHeight?: string;
    minHeight?: string;
    iconProps?: { name?: string, color?: string, size?: string },
    imageProps?: { height: string },
    onInvite?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const optionsOpt = [
    'Invitar integrante',
    'Modificar',
    'Eliminar',
];

const ITEM_HEIGHT = 48;

function UnitCard(props: UnitCardProps) {
    //   const { classes } = useStyles();
    const {
        unit,
        width = '100%',
        height = 'auto',
        maxHeight = null,
        minHeight = null,
        iconProps,
        imageProps = { height: '300px' },
        onInvite = () => { },
        onEdit = () => { },
        onDelete = () => { },
    } = props;

    const [anchorElOpt, setAchorElOpt] = useState(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const onClickInvite = () => {
        handleCloseOpt();
        onInvite();
    };

    const onClickEdit = () => {
        handleCloseOpt();
        onEdit();
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const handleClickOpt = (event: any) => {
        setAchorElOpt(event.currentTarget);
    };

    const handleCloseOpt = () => {
        setAchorElOpt(null);
    };
    return (
        <Card sx={{ width, height, maxHeight, minHeight }}>
            <CardHeader
                action={(
                    <IconButton
                        aria-label="More"
                        // aria-owns={anchorElOpt ? 'long-menu' : null}
                        aria-haspopup="true"
                        // className={classes.button}
                        onClick={handleClickOpt}
                        size="large"
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
                title={unit?.name}
                subheader={`Modificado: ${fDateSlash(unit?.last_change_date)}` || ''}
                titleTypographyProps={{
                    fontWeight: 'bold',
                    color: 'black', // Agrega la propiedad color
                }}
            />
            <Menu
                id="long-menu"
                anchorEl={anchorElOpt}
                open={Boolean(anchorElOpt)}
                onClose={handleCloseOpt}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem key='Invitar' onClick={onClickInvite}>Invitar</MenuItem>
                <MenuItem key='Edit' onClick={onClickEdit}>Editar</MenuItem>
                <MenuItem key='Eliminar' onClick={onClickInvite}>Eliminar</MenuItem>
            </Menu>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative' }}>
                {iconProps?.name &&
                    <Box style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))', position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}>
                        <CommonIcon iconName={iconProps.name} styles={{ fontSize: iconProps.size, display: 'flex', color: iconProps.color }} />
                    </Box>
                }
                {/* <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant='h4'>{unit?.name}</Typography>
                    <Typography variant="subtitle1">{fDateTime(unit?.last_change_date) || ''}</Typography>
                </Box> */}

            </Box>
            <CardContent sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-arround',
                rowGap: 2
            }}
            >
                <Box sx={{ width: '100%', height: '70px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Typography variant='h5'>Descripción</Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {unit?.description ?
                            unit?.description?.length > 60 ? `${unit?.description?.slice(0, 60)} ...`
                                : unit?.description
                            : 'Sin descripción'
                        }
                    </Typography>
                    {unit?.description && unit?.description?.length > 60 &&
                        <Popover
                            id="mouse-over-popover"
                            sx={{ pointerEvents: 'none' }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus

                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ width, padding: 0 }}
                            >
                                {unit?.description}
                            </Typography>
                        </Popover>
                    }
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {unit?.photo && unit?.photo !== '' && (
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {(!!unit?.photo) &&
                                <UnitIcon
                                    iconName={unit?.photo}
                                    styles={{
                                        fontSize: 100,
                                        display: 'flex',
                                        color: 'black',
                                        borderRadius: '5px',
                                        // border: '1px solid #ccc',
                                        boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                        padding: '5px'
                                    }}
                                />}
                        </Box>
                    )}
                </Box>

            </CardContent>
        </Card >
    );
}

export default UnitCard;
