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
              backgroundColor: '#f4f6f8',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
      <Container maxWidth="sm">
      <Formik
                initialValues={{
                  groupName: '',
                  groupDescription: '',
                }}
                validationSchema={Yup.object().shape({
                  groupName: Yup.string().max(50).required('Group name is required'),
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
                        Add new board
                      </Typography>
                    </Box>

                    <TextField
                      error={Boolean(touched.groupName && errors.groupName)}
                      fullWidth
                      helperText={touched.groupName && errors.groupName}
                      label="Board Name"
                      margin="normal"
                      name="groupName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.groupName}
                      variant="outlined"
                    />

                    <TextField
                      error={Boolean(touched.groupDescription && errors.groupDescription)}
                      fullWidth
                      helperText={touched.groupDescription && errors.groupDescription}
                      label="Board Description"
                      margin="normal"
                      name="groupDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.groupDescription}
                      variant="outlined"
                    />

<Box display='flex'>            
            <Box p={1}>
              <Button onClick={handleClose}
                      variant="contained" 
                      color="primary" className={classes.marginButton}> 
                  Cancel
                </Button>
           </Box>
          <Box p={1}>
            <Button onClick={handleSubmit}
                    variant="contained" 
                    color="primary" 
                    className={classes.marginButton}>
              Submit
            </Button>
          </Box>
       </Box>

                    
        
                    </form>
                )}
            

            </Formik>
            

      
            </Container>
               

        
       </Box>

  )
}

export default NewGroup; 