import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import image1 from '../../assets/imges/taskImage1.jpg';
import { CardHeader } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const GroupContainer = (props) => {
    const classes = useStyles(); 

    return (
        <Card className={classes.root}>
            <CardHeader 
                action = {
                    <IconButton aria-label="settings">
                         <MoreHorizIcon />
                    </IconButton>
                }
                title = {props.name}
                subheader = {props.description}
               />
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image1}
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
  
  

    )
}

export default GroupContainer; 
