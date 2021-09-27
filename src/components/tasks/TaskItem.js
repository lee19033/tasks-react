import React, {useState, useRef} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { purple, green, lightBlue } from '@material-ui/core/colors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AvatarGroup  } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { FormControlLabel } from '@material-ui/core';

import EditTask from "./EditTask";
import UserAvatarList from "../users/UserAvatarList";
import {useHttpClient} from "../../hooks/http-hook";

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
      backgroundColor: 'white',
      padding: 0,
      margin: 0,
    },
    cover: {
      height: '40px', 
      width:'100%',
      backgroundColor: 'blueviolet',
    },
    
  });

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
    onChange: {},
  })((props) => <Checkbox color="default"  {...props} />);
  

const TaskItem= (props) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const [taskCompleted, setTaskCompleated] = useState(props.status);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { isLoading, error, sendRequest, clearError  } = useHttpClient();
  const ref = React.createRef(); 


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTaskCompleted = (value) => {
    console.log('checkedstatus' + value);
    setTaskCompleated(!taskCompleted);
    console.log(taskCompleted);
    if (taskCompleted) {
      let taskStatusUpdate = {
            id: props.id,
            taskName: props.name,
            taskDescription: props.description, 
            taskDuedate: props.duedate,
            taskStatus: taskCompleted,
            taskMembers: props.members,
      }
      console.log('update status true');
      props.updatetaskhandler(taskStatusUpdate);
    }
  }

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
      <Card
        sx={{ height: '100%' }}
        {...props}
  >
    
    <CardHeader        
        title={props.name}
        subheader={props.description}
        
      />       
      
      <CardActions>
        <AvatarGroup>
          <UserAvatarList users={props.members}/>
        </AvatarGroup>            
      </CardActions>
      <CardActions disableSpacing>
      
      <FormControlLabel
        control={<Checkbox
                    sx={{
                      color: green[800],
                      '&.Mui-checked': {
                        color: green[600],
                      },
                    }}                    
                                  
                    name="checkedG"
                  />}
        label="completed"   
        onChange={e => handleTaskCompleted(e.target.checked)}
        checked={taskCompleted}   
      />
      <ExpandMore>
          <IconButton aria-label="settings" onClick={handleOpenModal} sx={{padding:0}}>   
               <EditOutlinedIcon sx={{ color: purple[500], }}  />     
           </IconButton>
           <IconButton onClick={deleteTaskHandler} sx={{padding:0}}>
               <DeleteOutlined sx={{ color: lightBlue[500]}}  />
            </IconButton>
      </ExpandMore>        
      </CardActions>

    </Card> 

<Dialog open={Boolean(showModal)} onClose={handleCloseModal}>
     
      <EditTask  data={props} taskId={props.id} groupId={props.groupId}
                  onClose={handleCloseModal} 
                  onUpdateTaskHandler={saveTaskHandler}
                  editTaskFlag={true} ref={ref}/>


  
</Dialog>
</React.Fragment>
)
}

export default TaskItem; 