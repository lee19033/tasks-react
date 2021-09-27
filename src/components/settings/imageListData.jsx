import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    /*overflow: 'hidden',*/
    width: 300,
    height: 422,
    backgroundColor: '#f4f6f8',
    direction: 'rtl',
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    /*transform: 'translateZ(0)', */
    direction: 'rtl',

  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  cover: {
    height: '50px', 
      width:'100%',
      backgroundColor: 'lightskyblue',
  },

}));


const ImageListData = (props) => {
    
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  

    const saveImageHandle = (event) => {
      console.log(event.target.currentSrc); 
      props.onClickImage(event.target.currentSrc); 
    }

    
    
    return (
      <Box className={classes.root}>
        <Box className={classes.cover}>
        </Box>


      <ImageList sx={{ width: 220, height: 300, backgroundColor:'f4f6f8', direction: 'ltr'}} cols={2} rowHeight={150} >
      {props.items.map((item) => (
        <ImageListItem key={item.id}
        >
          <img
            srcSet={`${item.media[0].tinygif.preview}?w=100&h=100&fit=crop&auto=format 1x`}
            onClick={saveImageHandle}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>  
    );
}

export default ImageListData; 
