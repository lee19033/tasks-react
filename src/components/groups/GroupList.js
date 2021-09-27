import React, {useReducer} from 'react';
import {NavLink} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Divider,
    getRadioUtilityClass,  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {useHttpClient} from "../../hooks/http-hook"; 
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import GroupItem from "./GroupItem";
import ImageListBoard from "../settings/imageBoard";
import TaskList from '../tasks/TaskList';
import NewTask from '../tasks/NewTask';
import { pink } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TaskBoard from '../tasks/taskBoard';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import NewGroup from './NewGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    root: {
        "& .MuiFilledInput-root": {
          background: "#fff",
        },
        '&:hover': {
            backgroundColor: '#ffffff'
            },
      },
    box: {
        backgroundColor: 'pink',
        color: 'black',
        minHeight: '100px',
        height: 'auto',
        display: 'block',
        lineHeight: '2',
        paddingBottom: '10px',
        boreder: '1px solid green',
    },
    boxIcon: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "25px"
    },
    container: {
      
    },
    box1: {
      backgroundColor: '#fff',
      width: '100%',
      height: 'auto',
      paddingLeft: '1px,',
      marginLeft: '1px',
    },
    paper: {
      backgroundColor: "#f4f6f8",
    },
    cover: {
      height: '50px', 
      width:'100%',
      backgroundColor: 'lightskyblue',
    }
  

  });

  function groupReducer(state, action) {
    let rowIndex = 0; 
    switch(action.type) {
      case 'create': 
        console.log('create');
        return [...state,action.group]
      case 'add':
        return [action.group, ...state];

      case 'remove':
         rowIndex = state.findIndex(item => item._id === action.group.id);
         console.log(rowIndex);
        if (rowIndex < 0) {
          return state;
        }
        const update = [...state];
        update.splice(rowIndex, 1);
        return update;

      case 'update': 
      console.log('update reducer' + action.group.id);
        rowIndex = state.findIndex(item => item._id === action.group.id);
        console.log(state);
        console.log(rowIndex);
        if (rowIndex < 0) {
            return state;
        }
        const updateRow = [...state];
        updateRow.splice(rowIndex, 1, action.group);
        return updateRow;
      default:
        return state;
    }
  };
  
  

const GroupList = (props) => {

    const theme = useTheme();
    const classes = useStyles();
    const taskNameRef = useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [taskName, setTaskName] = useState('');
    const [loadedTasks, setLoadedTasks] = useState('');
    const [groupList, setGroupList] = useReducer(groupReducer, props.items);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [openGroup, setOpenGroup] = useState(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const addTaskChangeHandler = (event) => {
      setTaskName(event.target.value);
    };
  
    const submitHandler = (event) => {
      event.preventDefault();
      const taskData = {
        groupId: 4, 
        taskId: 5, 
        taskName: taskName
      };

      props.onSaveTaskHandler(taskData);

      setTaskName('');

    }

    const saveGroupHandler = (groupData) => {
      add(groupData);
    };

    function add(group) {
      setGroupList({ group, type: 'add' });
    }

  function update(group) {
    setGroupList({group, type: 'update' });
  }
  
  function remove(group) {
     setGroupList({ group, type: 'remove'})
  }
  
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const saveTaskhandler = (saveTaskData) => {
      console.log("submit!");
    
      props.onSaveTaskHandler(saveTaskData);
      //handleClose();
      /*setData((prevData) => {
          return [saveGroupData, ...prevData];
      }); */     
  }

  const openGroupHandel = () => {
    setOpenGroup(true); 
  }

  const closeGroupHandel = () => {
    setOpenGroup(false);
  }

  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;  
        
        return (
          <Box
          sx={{
            minHeight: '100%',
          }}
        >
            <Container maxWidth={false}	sx={{
            minHeight: '100%',
          }}>          

                <Grid container direction="row" mb={3}>

                <Grid item xs={7} mt={1}>

                <Typography
                     color="primary"
                     variant="h4"
                  >
                    My Family Board
                       
                 </Typography>
                 </Grid>

            
          <Grid item xs={5}> 
                          
                          
                          <Box  sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
                            {!matches &&   
                            <IconButton aria-label="new board" size="large">
                              <AddCircleOutlineIcon fontSize="large" 
                                                    color="primary"
                                                    onClick={openGroupHandel} >
                                </AddCircleOutlineIcon>                          
                           </IconButton>
                      

                            }
                            {matches && 
                                   <Button variant="outlined" startIcon={<AddCircleOutlineIcon  />} onClick={openGroupHandel}>
                                           New Board
                                   </Button>
                            }
                                  

                                   </Box>
              </Grid>
          </Grid>


          { (groupList.length === 0) && 
                <Box sx={{ paddingLeft:2, }}>
                  <Typography
                     color="primary"
                     variant="h4"
                  >
                   No Boards yet.. , please create a new Board. 
                       
                 </Typography>
                </Box>
        }
             
          <Grid container spacing={3}>
                         
                {groupList.map(group => {
                 return  (
                 
                         <Grid item key={uuidv4()}
                         lg={3}
                          sm={6}
                          xl={3}
                          md={3}
                          xs={12}>
                            
                                <NavLink to={`/${group._id}/tasks/${group.groupName}`}>
                                  <GroupItem key={group._id} 
                                           groupid={group._id}
                                           groupname={group.groupName} 
                                           groupdescription={group.groupDescription}
                                           taskslen={group.groupTasks.length > 0 ? group.groupTasks.length : 0} />                                                     
                                 </NavLink>
                            </Grid>
                           
                           
                 )
                } 
                )
                }    
                   
                </Grid>

                <Dialog open={openGroup}>
              
                    <NewGroup onSaveGroup={saveGroupHandler} onClose={closeGroupHandel} />
       
             </Dialog>


 
            
                </Container>
                
       </Box>                    
        )
    }

export default GroupList; 
