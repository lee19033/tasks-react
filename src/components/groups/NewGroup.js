import React from 'react';
import { useRef} from 'react'; 
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'; 
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'; 
import Grid from '@material-ui/core/Grid'; 
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { MenuItem } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {useHttpClient} from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '45ch',
      },
    },
    TextField: {
        width: '45ch'
    },
    marginButton: {
        
      paddingTop: "10px",
              marginRight: "10px",
        padding: '10px'
    }
  }));

  


const NewGroup = (props) => {
    const classes = useStyles(); 
    const groupNameRef = useRef();
    const groupDescritionRef = useRef();
    const groupImageRef = useRef();
    const { isLoading, error, sendRequest, clearError  } = useHttpClient();
    const [color, setColor] = React.useState('');
    const [openColor, setOpenColor] = React.useState(false);
  
    const handleChangeColor = (event) => {
      setColor(event.target.value);
    };
  
    const handleCloseColor = () => {
      setOpenColor(false);
    };
  
    const handleOpenColor = () => {
      setOpenColor(true);
    };
  

    const createNewGroup = async (values) => {
  
      try {
        const responseData = await sendRequest('http://localhost:5000/api/groups/', 
          'POST',
          JSON.stringify({
            groupName: values.groupName,
            groupDescription: values.groupDescription,
            
          }),
          {
            'Content-Type': 'application/json'
          },
        );    
        //props.onSaveTaskHandler(responseData.group);  
        props.onSaveGroup(responseData.group);  
          
      }
      catch(err) {
        console.log(err);
      }

      props.onClose();
    
    }

    
    const handleSubmit = event => {
        event.preventDefault();
  
        //props.onSaveGroup(groupData);

       const createNewGroup = async () => {
          try {
            await sendRequest('http://localhost:5000/api/groups/', 
              'POST',
              JSON.stringify({
                groupName: groupNameRef.current.value,
                groupDescription: groupDescritionRef.current.value,
              }),
              {
                'Content-Type': 'application/json'
              },
          );       
              
          }
          catch(err) {
            console.log(err);
          }
        
        }
        createNewGroup();
        props.onClose();    

   };

   const history = useHistory();

   const handleClose = event => {
        event.preventDefault();
        props.onClose();
   }

    return (

      <Box
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
          >
 
      <Formik
                initialValues={{
                  groupName: '',
                  groupDescription: '',
                }}
                validationSchema={Yup.object().shape({
                  groupName: Yup.string().max(50).required('Board name is required'),
                  groupDescription: Yup.string().max(250),                          
                })}
                onSubmit={(values) => {
                  createNewGroup(values);
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

<Card>
            <CardHeader sx={{padding: '5px', paddingLeft:'16px'}}
              title="New Board"
              action={
                <IconButton aria-label="settings" onClick={handleClose}>                                        
                  <ClearSharpIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                      error={Boolean(touched.groupName && errors.groupName)}
                      fullWidth
                      helperText={touched.groupName && errors.groupName}
                      label="Board Name"
                      required
                      name="groupName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.groupName}
                      variant="outlined"                      
                    />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                 <TextField
                      error={Boolean(touched.groupDescription && errors.groupDescription)}
                      fullWidth
                      helperText={touched.groupDescription && errors.groupDescription}
                      label="Board Description"
                  
                      name="groupDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.groupDescription}
                      variant="outlined"
                      multiline
                      rows={3}
                    />                 
                 
                </Grid>
                <Divider />

                <Grid item
                  md={12}
                  xs={12}>


<Button sx={{ display: 'block', mt: 0}} onClick={handleOpenColor}>
        Select board color 
      </Button>
      <FormControl sx={{ m: 0, maxHeight:120, minWidth: 200, display: 'inline-flex'  }}>
        <InputLabel id="demo-controlled-open-select-label">Color</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openColor}
          onClose={handleCloseColor}
          onOpen={handleOpenColor}
          value={color}
          label="color"
          onChange={handleChangeColor}
        >
          <MenuItem value={'blue'}><Box sx={{width:'130px', height: '20px', backgroundColor: 'blue', margin: '10px',color: 'white', align:'middle'}}></Box></MenuItem>
          <MenuItem value={'red'}><Box sx={{width:'130px', height: '20px', backgroundColor: 'red', margin: '10px'}}></Box></MenuItem>
          <MenuItem value={'green'}><Box sx={{width:'130px', height: '20px', backgroundColor: 'green', margin: '10px'}}></Box></MenuItem>
          <MenuItem value={'orange'}><Box sx={{width:'130px', height: '20px', backgroundColor: 'orange', margin: '10px'}}></Box></MenuItem>
        </Select>
      </FormControl>

                </Grid>  
              </Grid>
            </CardContent>

            

            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                Create Board
              </Button>
            </Box>
          </Card>
                 
                    

                    
                    </form>
                )}
            

            </Formik>
            </Box>
            

      
         

  )
}

export default NewGroup; 