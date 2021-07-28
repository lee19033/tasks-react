import React, {useState} from 'react'; 
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import {
  Typography,
    Button,
    Box
} from '@material-ui/core';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
        "& .MuiFilledInput-root": {
          background: "#fff",
        },
        '&:hover': {
            backgroundColor: 'lightgray'
            },
        margin: '5px',    
      },    
    button: {
        background: "#fff",
    },
},
)

const NewTask = (props) => {

    const classes = useStyles();
    const [taskName, setTaskName] = useState('');
    const [showTask, setShowTask] = useState('false');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(taskName); 
        const taskData = {
          groupId: props.groupId, 
          taskId: 5, 
          taskName: taskName
        }
        props.onSaveTaskHandler(taskData);

        setTaskName('');
    };

    const handleClose = () => {
        setTaskName('');
        setShowTask('false');
    }

    const handleOpen = () => {
        setShowTask('true');
    }

    const addTaskChangeHandler = (event) => {
        setTaskName(event.target.value);
      };

    return (
        <div>
            {showTask === 'true' &&
                    <form onSubmit={submitHandler}
                          className={classes.root} 
                          noValidate autoComplete="off" hidden={!showTask}>                    
                            <TextField
                                id={uuidv4()}
                                variant="filled"
                                className={classes.root}
                                fullWidth={true}
                                multiline={true}
                                rows={2}
                                label="Add new task..."
                                onChange={addTaskChangeHandler}
                                value={taskName}
                            />      
                            <Box display='flex' className='classes.button'>            
                                <Box flexGrow={1} p={1}>                      
                                    <Button variant="contained" 
                                            type="submit"
                                            color="primary" 
                                            component="span"
                                            onClick = {submitHandler}
                                    >
                                    Add
                                    </Button>
                                </Box>
                            <Box>
                                <IconButton color="primary" 
                                            component="span"
                                            onClick={handleClose} >
                                    <CancelPresentationIcon fontSize="medium"/>
                                </IconButton>
                            </Box>
                         </Box>
                    </form>   
                    }      
                    {showTask === 'false' &&                 
                         <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={<AddIcon />}
                            onClick={handleOpen}>                            
                            <Typography variant="subtitle1">
                                   Add another task
                            </Typography>
                        </Button>
                    }
            </div>
      
    )
}
export default NewTask