import React from 'react';
import {useState, useRef, useContext } from 'react'; 
import { useParams } from 'react-router-dom'; 
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import NoteIcon from '@material-ui/icons/Note';
import {createTheme} from '@material-ui/core/styles';
import {
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/core/styles';


import useInput from "../../hooks/use-input";

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import DatePicker from '@material-ui/lab/DatePicker';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import UserItem from '../users/UserItem';
import UserListItem from '../users/UserListItem';

import AddIcon from '@material-ui/icons/Add';
import UserListSelect from '../users/UserListSelect';

import {useHttpClient} from "../../hooks/http-hook";
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../../context/auth-context';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '45ch',
      },
    },
    TextField: {
        width: '45ch',
        height: '10px',
    },
    marginButton: {
        
      paddingTop: "10px",
       marginRight: "10px",
        padding: '10px'
    },
    cover: {
      backgroundColor: "lightpink",
      padding: 0,
      margin:0,
      height: '6em',
      width:'100%'
    },
    taskContainer: {
      backgroundColor: "lightskyblue",
    }
  }));

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const isNotEmpty = value => value.trim() !== ''; 
const isEmail = value => value.includes('@'); 
const isDuedate = value => value.trim() === '';

const EditTask = (props) => {

  const [value, setValue] = React.useState('');
  const [duedateValue, setDuedateValue] = React.useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(props.editTaskFlag);
  const { isLoading, error, sendRequest, clearError  } = useHttpClient();
  //const taskId = useParams().id; 
  const taskName = useParams().taskName;
  const members = useContext(AuthContext);

  
  //const groupName = useParams().groupName; 

    const handleOpen = () => {
      setOpen(true);
    };

    const handleCloseMembersList = () => {
      setOpen(false);
    };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleDescription = (event) => {
    setDescriptionValue(event.target.value);
  };
   
    /*const { //taskName 
      value: taskNameValue,
      isValid: taskNameIsValid,
      hasError: taskNameHasError, 
      valueChangeHandler: taskNameChangeHandler,
      inputBlurHandler: taskNameBlurHandler,
      reset: resetTaskName 
    } = useInput(isNotEmpty, props.data.name || '');*/


    //let formIsValid = false; 

    //if (taskNameIsValid) {
    //  formIsValid = true; 
   // }

  
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  

    const createNewTask = async (values) => {
      console.log("group=" + props.groupId);
      try {
        const responseData = await sendRequest('http://localhost:5000/api/tasks/', 
          'POST',
          JSON.stringify({
            groupId: props.groupId,
            taskName: values.taskName,
            taskDescription: values.taskDescription,
            taskStatus: values.status,
            taskDuedate: values.dueDate,
            taskMembers: values.taskMembers,

          }),
          {
            'Content-Type': 'application/json'
          },
        );    
        props.onSaveTaskHandler(responseData.task);    
          
      }
      catch(err) {
        console.log(err);
      }

      handleClose();
    
    }

    const updateTask = async (values) => {
      console.log(values.status);
      console.log('mem' + values.taskMembers);
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/tasks/${props.taskId}`, 
          'PATCH',
          JSON.stringify(
          {
            taskName: values.taskName,
            taskDescription: values.taskDescription, 
            taskDuedate: values.dueDate,
            taskStatus: values.status,
            taskMembers: values.taskMembers,

          }),
          {
            'Content-Type': 'application/json'
          },
        );    
        props.onUpdateTaskHandler(responseData.task);    
          
      }
      catch(err) {
        console.log(err);
      }

      handleClose();
    
    }
 
     


    

    const handleSubmit = event => {
        event.preventDefault();
        //console.log('valid' + formIsValid);
        //if (!formIsValid) {
        //  return; 
        //}

        const taskData = {
          groupId: props.groupId,
          //taskName: taskNameValue,
          //taskDescription: descriptionValue,
          taskDuedate: value, 
        };

        
        console.log(taskData);
        //props.onSaveTaskHandler(taskData);

        console.log('submit');
      
   };

   const handleClose = () => {
        props.onClose();
   }

   function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


    return(
      <Box
            sx={{
              backgroundColor: '#f4f6f8',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
      <Container maxWidth="sm">
      <Formik
                initialValues={{
                  taskName: props.data? props.data.name : '',
                  taskDescription: props.data ? props.data.description : '',
                  taskMembers: props.data ? props.data.members : [],
                  status: props.data ? props.data.status : false, 
                  dueDate: (props.data) ? (props.data.duedate !== '' ? new Date(props.data.duedate).toISOString().substring(0, 10) : '') : '',
                  image: ''
                }}
                validationSchema={Yup.object().shape({
                  taskName: Yup.string().max(50).required('Task name is required'),
                  taskDescrition: Yup.string().max(250),
                  taskMembers: Yup.array(),
                  dueDate: Yup.date(),
                  status: Yup.boolean(),
                          
                })}
                onSubmit={(values) => {
                  if (editTask) {
                    updateTask(values); 
                  }
                  else {
                    createNewTask(values);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        pb:1,
                        pt: 1
                      }}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="h4"
                      >
                        {editTask ? 'Edit Task' : 'New Task'} 
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.taskName && errors.taskName)}
                      fullWidth
                      helperText={touched.taskName && errors.taskName}
                      label="Task Name"
                      margin="normal"
                      name="taskName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.taskName}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.taskDescription && errors.taskDescription)}
                      fullWidth
                      helperText={touched.taskDescription && errors.taskDescription}
                      label="Description"
                      margin="normal"
                      name="taskDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.taskDescription}
                      variant="outlined"
                    />

<FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <InputLabel id="demo-multiple-name-label">Members</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={values.taskMembers}
          name="taskMembers"
          onChange={handleChange}
          onBlur={handleBlur}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {members.familyMembers.map((user) => (
            <MenuItem
              key={user.id}
              value={user.id}
              style={getStyles(user, user.firstName, theme)}
            >
              {user.firstName + ' ' + user.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>            

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FormControl sx={{ m: 0, mt:2 }} fullWidth>

      <TextField
        id="date"
        label="Due Date"
        name="dueDate"
        value={values.dueDate}
        dateformat="dd-MM-yyyy"
        type="date"
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </FormControl>

    </LocalizationProvider>
                       
        <FormGroup>
                <FormControlLabel control={<Checkbox  />} 
                   label="Completed" 
                   checked={values.status}
                   name="status"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   />  
              </FormGroup>



                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Save
                      </Button>
                    </Box>
                    {isLoading && <CircularProgress color="primary"/>}
                  </form>
                )}               
              </Formik>
            

      
    </Container>
    </Box>
    )
}
export default EditTask