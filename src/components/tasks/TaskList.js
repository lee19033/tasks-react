import React, {useState, useReducer} from 'react';
import {NavLink, Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {
    Box,
    Button,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { purple, red, green, lightBlue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import EditTask from "./EditTask";
import TaskItem from "./TaskItem";

const useStyles = makeStyles( theme => ({
    root: {
      maxWidth: '26rem',
      margin: '5px',
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
    box: {
      minHeight: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 240,
      }
    },
    
  }));

  function tasksReducer(state, action) {
    let rowIndex = 0; 
    switch(action.type) {
      case 'create': 
        console.log('create');
        return [...state,action.task]
      case 'add':
        return [action.task, ...state];

      case 'remove':
         rowIndex = state.findIndex(item => item._id === action.task.id);
         console.log(rowIndex);
        if (rowIndex < 0) {
          return state;
        }
        const update = [...state];
        update.splice(rowIndex, 1);
        return update;

      case 'update': 
        rowIndex = state.findIndex(item => item._id === action.task.id);
        if (rowIndex < 0) {
            return state;
        }
        const updateRow = [...state];
        updateRow.splice(rowIndex, 1, action.task);
        return updateRow;
      default:
        return state;
    }
  };
  
  
  const handleAddNewTask = (taskData) => {
    //add(taskData);                
}


const TaskList = (props) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState("1");
    const [selectedtask, setSelectedTask] = useState({}); 
    const [taskList, setTaskList] = useReducer(tasksReducer, props.items);
    const groupName = props.name;   

    const handelTabChange = (event, newValue) => {
      setTabValue(newValue);
    }
    const handleOpen = (task) => {
        console.log('222'+ task);
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };

    const saveTaskHandler = (taskData) => {
        //props.onSaveTaskHandler(taskData);
        add(taskData);
    };
    
    const updateTaskHandler = (taskData) => {
      console.log('opopo ' + taskData.id);
      update(taskData);
    }

    const deleteTaskHandler = (task) => {
      remove(task); 
    }

    function add(task) {
        setTaskList({ task, type: 'add' });
    }

    function update(task) {
      setTaskList({task, type: 'update' });
    }
    
    function remove(task) {
       setTaskList({ task, type: 'remove'})
    }
    return (
        
        <React.Fragment>
            

                <Box className={classes.box}>
                        
                  <Container  maxWidth="lg">

                  <Grid container direction="row" mt={3}>
                      <Grid item xs={7}>
                  <Typography
                     color="primary"
                     variant="h4"
                  >
                       {groupName}
                       
                 </Typography>
                 </Grid>
                 
                 <Grid item xs={5}> 
                          
                 <Box  sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
                          <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>
                                  New Task
                          </Button>
                          </Box>
                 </Grid>
                 </Grid>
                 <Grid container direction="row">
                   <Grid item> 
                 <Tabs
    value={tabValue}
    onChange={handelTabChange}
    indicatorColor="primary"
    textColor="primary"
  >
    <Tab label="To do" value="1"/>
    <Tab label="completed" value="2"/>
    <Tab label="all tasks" value="3"/>
  </Tabs>
</Grid>
                 </Grid>

                             <Grid container spacing={1} mt={1}>
                      {taskList.map(task => {
                       return  (
                       
                               <Grid item key={uuidv4()}
                               lg={3}
                                sm={6}
                                xl={3}
                                md={4}
                                xs={12}>
                                                                             
                                  <TaskItem 
                                        key={task._id} 
                                        id={task._id} 
                                        name={task.taskName}
                                        description= {task.taskDescription}
                                        duedate = {task.taskDuedate}
                                        image = {task.taskImage} 
                                        group = {task.groupId} 
                                        status = {task.taskStatus ? task.taskStatus : false}
                                        members = {task.taskMembers}
                                        updatetaskhandler = {updateTaskHandler}
                                        deletetaskhandler = {deleteTaskHandler}
                                    />   
                                
                        
                                                                                
                                  </Grid>
                                 
                                 
                       )
                      } 
                      )
                      }    
                         
                      </Grid>
                  
                      </Container>
             </Box>                   


             <Dialog open={open} 
           
            >
               
            <EditTask   groupId={props.groupId}
                        onClose={handleClose} 
                        onSaveTaskHandler={saveTaskHandler}
                        selectedtask={selectedtask}
                        editTaskFlag={false}/>
      </Dialog>

               
            
           
        </React.Fragment>
    )

    
}

export default TaskList;