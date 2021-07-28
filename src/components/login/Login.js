import React, { useContext } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorDialog from "../alerts/ErrorDialog";
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

const Login = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient(); 

    const loginUser = async (values) => {
      try {
          const responseData = await sendRequest(
          'http://localhost:5000/api/Users/login', 
          'POST',
          JSON.stringify({
            email: values.email,
            password: values.password
          }),
          {
            'Content-Type': 'application/json'
          },                 
        );
        
        auth.login(responseData.user.id);
      }
      catch(err) {
        console.log(err);
      }

    }

    return (
        <>
            <title>Login | My Family Board</title>
            { (error) && 
        
        <ErrorDialog open={true} error={error} onClose={clearError} />
    }
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
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(55).required('Email is required'),
                  password: Yup.string().max(8).required('Password is required')
                })}
                onSubmit={(values) => {
                  loginUser(values);
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
                        pb:3,
                        pt: 4
                      }}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="h4"
                      >
                        Login 
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Don&apos;t have an account?
                      {' '}
                      <Link
                      component={RouterLink}
                        to="/register"
                        variant="h6"
                      >
                        Sign up
                      </Link>
                      {isLoading && <CircularProgress color="primary"/>}
                    </Typography>
                  </form>
                )}
               
              </Formik>
            </Container>
          </Box>
        </>
      );
}

export default Login;
