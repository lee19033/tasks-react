import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorDialog from "../alerts/ErrorDialog";
import { AuthContext } from "../../context/auth-context"; 
import { useHttpClient } from "../../hooks/http-hook";

const Register = () => {  

    const auth = useContext(AuthContext); 

    const { isLoading, error, sendRequest, clearError  } = useHttpClient();

    const createUser = async (values) => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/Users/signup', 
          'POST',
          JSON.stringify({
            firstName: values.firstName, 
            lastName: values.lastName,
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
        <title>Register | My Family Board</title>
        { (error) && 
        
            <ErrorDialog open="true" error={error} />
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
              firstName: '',
              lastName: '',
              password: '',
              membersEmail: [],
              policy: false
            }}
           
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(25).required('First name is required'),
                lastName: Yup.string().max(25).required('Last name is required'),
                password: Yup.string().max(8).required('password is required'),
                membersEmail: Yup.array().of(
                        Yup.string().email('must be a valid email').max(255)
                    )             
                })
            }
            onSubmit= {(values, {setSubmitting}) => {
              //navigate('/app/dashboard', { replace: true });
              console.log(values);
              setSubmitting(false);
              createUser(values);
            
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
                <Box sx={{ mb: 3, pt:3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Family Name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
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
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Add Family members Email Address sperate by comma"
                  margin="normal"
                  name="membersEmailArray"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.membersEmailArray}
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
                
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                 
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                  
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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
};

export default Register;
