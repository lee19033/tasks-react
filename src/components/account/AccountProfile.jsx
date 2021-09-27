import React, {useContext, useEffect, useState, useRef} from 'react';
import {Formik, Form} from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  Typography
} from '@material-ui/core';
import { AuthContext } from '../../context/auth-context';

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
    justifyContent: 'center',
  }

});


const AccountProfile = (props) => {

  const classes = useStyles();

  const [imageFile, setImageFile] = useState(); 
  const [previewUrl, setPreviewUrl] = useState(); 
  const ctx = useContext(AuthContext);
  const user = ctx.userId; 
  const fileInputRef = useRef();


  const handleSubmit = (file) => {
    props.onUploadImage(file); 
  }

  useEffect(() => {
    if (!imageFile) {
      return; 
    }
    const fileReader = new FileReader(); 
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); 
    }
    fileReader.readAsDataURL(imageFile); 

  }, [imageFile]); 

    
  return (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        { !previewUrl && user?.image && 
        <Avatar
          src={`http://localhost:5000/${user.image.replaceAll('\\','/')}`}
          sx={{
            height: 100,
            width: 100
          }}
        />
        }
        {previewUrl && 
          <Avatar
          src={previewUrl}
          sx={{
            height: 100,
            width: 100
          }}
        />
        }
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >

        </Typography>
      </Box>
    </CardContent>
    <Divider />

    
    <Box sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row'
        }} >

        <CardActions>       
   
    <Formik 
        initialValues={{ uploadImage: ''}}
        onSubmit={handleSubmit}>
        {(formProps) => (
          
          <Form>
            <input
             id="image1"
              type="file"
              hidden={true}
              name="file1"
              ref={fileInputRef}
              onChange={(event) =>{
                setImageFile(event.target.files[0]);
                formProps.setFieldValue("uploadImage", event.target.files[0]);
                handleSubmit(event.target.files[0]);
              }}
            />
      
            
                  <Button
              color="primary"        
              variant="text"    
              onClick={()=>fileInputRef.current.click()}
            >
              Upload picture
            </Button>

          </Form>
        )}
      </Formik>


    </CardActions>
    </Box>


  </Card>
);
}
export default AccountProfile;
