import React, {useState} from 'react'; 
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import NoteIcon from '@material-ui/icons/Note';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import {
  Avatar,
  Grid,
} from '@material-ui/core';



import NewTask from '../tasks/NewTask';
import EditTask from '../tasks/EditTask';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'pink',
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
    backgroundColor: "white",
  },
  cover: {
    height: '100px', 
    width:'100%',
    backgroundColor: 'lightskyblue',
  },

  
});


const GroupItem = (props) => {

  //const classes = useStyles();
   const [open, setOpen] = useState(false);
   
   const handleOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const saveTaskHandler = (taskData) => {
    props.onSaveTaskHandler(taskData);
  }

    return (
      <Card
        sx={{ height: '100%' }}
        {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
           {props.taskslen > 0 && 
             `${props.taskslen} Tasks`
           }
          </Typography>
          <Typography sx={{ wordBreak: 'break-all'}}
            color="textPrimary"
            variant="h4"
          >
            {props.groupname.toUpperCase()}  
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        
        
         
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {props.groupdescription}
        </Typography>
      </Box>
    </CardContent>
  </Card>

    );
}
export default GroupItem; 