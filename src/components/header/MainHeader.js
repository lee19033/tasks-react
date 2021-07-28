import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import  { Link } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import NewGroup from '../groups/NewGroup';


import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';

import IconButton from '@material-ui/core/IconButton'
import { AuthContext } from '../../context/auth-context';
import { Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { styled, useTheme } from '@material-ui/styles';
import CreateNewFolderTwoToneIcon from '@material-ui/icons/CreateNewFolderTwoTone';
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

const drawerWidth = 240;


function ElevationScroll(props) {
  const { children} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  logo: {
    height: "3em",
    marginBottom: "10px",
    marginLeft: "5px"
  },
  tabContainer: {
    /*marginLeft: 'auto'*/
  },
  tab: {
    ...theme.mixins.tab,
    minWidth: 10,
    marginLeft: "5px"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "25px",
  },
  appBar: {
    height: "4rem",
    backgroundColor: '#5664D2',
  },
  paper: {
    backgroundColor: "#f4f6f8",
  },
  cover: {
    height: '50px', 
    width:'100%',
    backgroundColor: 'lightskyblue',
  }

}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const MainHeader = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [data, setData] = useState(props.items); 

  const auth = useContext(AuthContext); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openGroupHandel = () => {
    setOpenGroup(true); 
  }

  const closeGroupHandel = () => {
    setOpenGroup(false);
  }

  const handleChange= (e,value) => {
    setValue(value); 
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveGroupHandler = (saveGroupData) => {
    console.log("submit!");
    console.log(saveGroupData);
    props.onSaveGroup(saveGroupData);
    handleClose();
    /*setData((prevData) => {
        return [saveGroupData, ...prevData];
    }); */     
}


  return (
    <React.Fragment>
      <ElevationScroll>
        <Container maxWidth={false}>
         <AppBar position="fixed" className={classes.appBar}>
           {auth.isLoggedIn && 
          <Toolbar disableGutters>

<IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ml: 0.1, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

            
            <Avatar alt="user name" className={classes.avatar}>LA</Avatar>
          </Toolbar>
}
        </AppBar>


        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button key={'Group'} onClick={openGroupHandel}>
              <ListItemIcon>
                 <CreateNewFolderTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Create new board'} />
            </ListItem>

            <ListItem button key={'Family'} onClick={openGroupHandel}>
              <ListItemIcon>
                 <LoyaltyTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Family members'} />
            </ListItem>

            <ListItem button key={'Settings'} onClick={openGroupHandel}>
              <ListItemIcon>
                 <SettingsTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItem>
  
            <ListItem button key={'Logout'} onClick={openGroupHandel}>
              <ListItemIcon>
                 <ExitToAppTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
  
  
  
        </List>
      </Drawer>

      <Dialog open={openGroup}>
              <Box className={classes.cover} sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
              <CancelIcon sx={{color: 'white', fontSize: 'Large', width:'45px', height:'50px'}} onClick={closeGroupHandel} />
           </Box>
       <DialogContent className={classes.paper}>
         <Box display="flex"> 
          
           <Box>
             <NewGroup onClose={closeGroupHandel} />
           </Box>
         </Box>
       </DialogContent>
     </Dialog>


        </Container>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

export default MainHeader
