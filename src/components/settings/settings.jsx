import { Box, Container } from '@material-ui/core';
import SettingsNotifications from './settingsNotification';
import SettingsPassword from './settingsPassword';
import { makeStyles } from '@material-ui/core/styles';

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


const SettingsView = () => {

  const classes = useStyles();
  
  return (

  <>
      <title>Settings</title>
    <Box className={classes.box}>
      <Container maxWidth="lg">
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
)
};

export default SettingsView;
