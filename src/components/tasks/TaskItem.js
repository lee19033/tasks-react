import React, {useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { purple, red, green, lightBlue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import AvatarGroup from '@material-ui/core/AvatarGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';
import { v4 as uuidv4 } from 'uuid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {useHttpClient} from "../../hooks/http-hook";

import {
  Grid,
} from '@material-ui/core';

import FamiliyImage from "../../assets/imges/family.jpg";
import { Divider } from '@material-ui/core';

import EditTask from "./EditTask";
import UserAvatarList from "../users/UserAvatarList";
import { DeleteOutlined } from '@material-ui/icons';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const useStyles = makeStyles({
    root: {
      maxWidth: '26rem',
      margin: '5px'
    },
    media: {
      height: 140,
    },
    dialog: {
      margin:0,
      padding:0,
      container: "yellowgreen",
    },
    paper: {
      backgroundColor: "#f4f6f8",
    },
    cover: {
      height: '50px', 
      width:'100%',
      backgroundColor: 'lightskyblue',
    },
    
  });

  

  
const TaskItem= (props) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [anchorEl, setAnchorEl] = React.useState(false);
    const { isLoading, error, sendRequest, clearError  } = useHttpClient();



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
    };

  const handleCloseModal = () => {
    setShowModal(false); 
  }

  const handleOpenModal = () => {
    setShowModal(true); 
  }
  
  const saveTaskHandler = (taskData) => {
    console.log('taskData' + taskData.id);
      props.updatetaskhandler(taskData);
  }

  const deleteTaskHandler = async (values) => {
    console.log("group=" + props.id);
    try {
      await sendRequest(`http://localhost:5000/api/tasks/${props.id}`,
                        'DELETE');            
      props.deletetaskhandler({'id': props.id});            
    }
    catch(err) {
      console.log(err);
    }
  
  }

    return (
      <React.Fragment>
      <Box >
      <Card
        sx={{ height: '100%' }}
        {...props}
  >
    <CardHeader        
        action={
          <Box>
          <IconButton aria-label="settings" onClick={handleOpenModal}>   
               <EditOutlinedIcon sx={{ color: purple[500],}}  />     
           </IconButton>
           <IconButton onClick={deleteTaskHandler}>
               <DeleteOutlined sx={{ color: lightBlue[500], }}  />
            </IconButton>
          </Box>
            

          

        }
        title={props.name}
        subheader={props.description}
      />
    
      <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>Open Task</MenuItem>
  <MenuItem onClick={handleClose}>Remove Task</MenuItem>
  <MenuItem onClick={handleClose}>New Task</MenuItem>

</Menu>


      {props.image!=='' && matches && 
        <CardMedia
          className={classes.media}
          image={'https://media.tenor.com/images/69091765454cda96d8519173015fa4dd/tenor.png'}
          title="Contemplative Reptile"
        />
       }
       
       {matches && 
      <CardActions>
        <AvatarGroup>
                     <UserAvatarList />
                     </AvatarGroup>
                
       
      </CardActions>
}
     
     {matches && 
     <CardActions>      
      <Typography variant="subtitle2" color="textSecondary" component="p">
       <Radio value="completed"   sx={{
            color: purple[800],
            '&.Mui-checked': {
              color: purple[600],
            },
          }}
checked="true" size="small" />
            completed at 22/6/2021
          </Typography>             
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ShareIcon />
        </ExpandMore>
      </CardActions>     
}


           
      
      
      <Divider></Divider>
    </Card> 
    </Box>

<Dialog open={Boolean(showModal)} onClose={handleCloseModal}>
<Box className={classes.cover} sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
         <IconButton onClick={handleCloseModal}>
            <CancelIcon sx={{color: 'white', fontSize: 'Large', width:'45px', height:'50px'}}  />
         </IconButton>
      </Box>
  <DialogContent className={classes.paper}>
    <Box display="flex"> 
     
      <Box>
      <EditTask  data={props} taskId={props.id} groupId={props.groupId}
                  onClose={handleCloseModal} 
                  onUpdateTaskHandler={saveTaskHandler}
                  editTaskFlag={true}/>
      </Box>
    </Box>
  </DialogContent>
</Dialog>
</React.Fragment>
);
}

export default TaskItem; 