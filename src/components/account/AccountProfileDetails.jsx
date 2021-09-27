import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { AuthContext } from '../../context/auth-context';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import { MarkEmailReadOutlined } from '@material-ui/icons';


const AccountProfileDetails = (props) => {

  const ctx = useContext(AuthContext);
  const user = ctx.userId;

  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <Formik 
        initialValues={{ 
          firstName: user ? user.firstName : '',
          lastName: user ? user.lastName: '', 
          email: user ? user.email: '', 
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(50).required('First name is required'),
          lastName: Yup.string().max(50).required('Last name is reauired'),
          email: Yup.string().email('Must be a valid email').max(55).required('Email is required'),
                       
        })}

        onSubmit={(values, {resetForm}) => {          
          props.onSaveAccount(values); 
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

          <form onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          {...props}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                 
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                 
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                 
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
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>)}
      </Formik>
    
  );
};

export default AccountProfileDetails;
