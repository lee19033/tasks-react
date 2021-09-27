import React, {useState, useContext} from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';
import {useHttpClient} from "../../hooks/http-hook";
import { AuthContext } from '../../context/auth-context';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorDialog from "../alerts/ErrorDialog";

const useStyles = makeStyles( theme => ({
  box: {
    backgroundColor: 'background.default',
    minHeight: '100%',
    py: 3,
    paddingTop: 30,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 240,
    }
  },  
}));


const Account = (props) => {

  const classes = useStyles();
  const [imageUpload,setImageUpload] = useState(); 
  const { isLoading, error, sendRequest, clearError  } = useHttpClient();
  const members = useContext(AuthContext);

  const saveAccountDetailsHandler = async (values) => {
     
      try {
        const formData = new FormData();
        formData.append('firstName', values.firstName); 
        formData.append('lastName', values.lastName); 
        formData.append('email', values.email); 
        formData.append('image', imageUpload);
        const responseData = await sendRequest(`http://localhost:5000/api/users/${members.userId._id}`, 
          'PATCH',
          formData,
          { Authorization: 'Bearer ' + members.token }
        );    
        members.updateUserDetails(responseData.user); 
      }
      catch(err) {
        console.log('err' + err);
      }
  }

  const saveAccountImageHandler = (image) => {
    setImageUpload(image);
  }

  
  return (
  <>
      <title>Account</title>
    <Box className={classes.box}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile onUploadImage={saveAccountImageHandler}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails onSaveAccount={saveAccountDetailsHandler}/>
          </Grid>
        </Grid>
        {isLoading && <CircularProgress color="primary"/>}
      </Container>
    </Box>
  </>)
};

export default Account;
