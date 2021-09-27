import { useContext } from 'react';
import { Box, Container } from '@material-ui/core';
import UserListMembersResults from './UserListMembersResults';
import UserListMembersToolbar from './UserListMembersToolbar';
import { AuthContext } from '../../context/auth-context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  box: {
    pt: 3,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 240,
    }
  },  
}));


const UserListMembers = () => {

    const classes = useStyles();
    const ctx = useContext(AuthContext);

    return (

  <>
      <title>Family Members</title>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box className={classes.box}>
          <UserListMembersResults customers={ctx.familyMembers} />
        </Box>
      </Container>
    </Box>
  </>)

    }

export default UserListMembers;
