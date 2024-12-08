import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Comment from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import useStyles from './cardStyle-jss';
import styles from './postCard.module.css';

const optionsOpt = [
    'Report this post',
    'Hide this post',
    'Copy link',
];

const ITEM_HEIGHT = 48;

function PostCard(props: any) {
    const [anchorElOpt, setAchorElOpt] = useState(null);

    const handleClickOpt = (event: any) => {
        setAchorElOpt(event.currentTarget);
    };

    const handleCloseOpt = () => {
        setAchorElOpt(null);
    };

    //   const { classes } = useStyles();
    const {
        avatar,
        name,
        date,
        image,
        content,
        liked,
        shared,
        commented
    } = props;
    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                avatar={
                    avatar && <Avatar alt="avatar" src={avatar} className={styles.avatar} />
                }
                action={(
                    <IconButton
                        aria-label="More"
                        // aria-owns={anchorElOpt ? 'long-menu' : null}
                        aria-haspopup="true"
                        // className={classes.button}
                        onClick={handleClickOpt}
                        size="large">
                        <MoreVertIcon />
                    </IconButton>
                )}
                title={name}
                subheader={date}
            />
            <Menu
                id="long-menu"
                anchorEl={anchorElOpt}
                open={Boolean(anchorElOpt)}
                onClose={handleCloseOpt}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {optionsOpt.map(option => (
                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={handleCloseOpt}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            {image !== '' && (
                <CardMedia
                    //   className={styles.media}
                    sx={{ height: 300, objectFit: 'cover' }}
                    image={image}
                    title="Contemplative Reptile"
                />
            )}
            <CardContent>
                <Typography component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions}>
                <IconButton aria-label="Add to favorites" className={styles.button} size="large">
                    <FavoriteIcon className={liked > 0 ? styles.liked : ''} />
                    <span className={styles.num}>{liked}</span>
                </IconButton>
                <IconButton aria-label="Share" className={styles.button} size="large">
                    <ShareIcon className={shared > 0 ? styles.shared : ''} />
                    <span className={styles.num}>{shared}</span>
                </IconButton>
                <IconButton aria-label="Comment" className={styles.rightIcon} size="large">
                    <Comment />
                    <span className={styles.num}>{commented}</span>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default PostCard;
