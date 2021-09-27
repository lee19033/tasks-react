import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

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
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import logo from '../../assets/logo.svg';
import Stack from '@material-ui/core/Stack';


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
    marginLeft: 'auto'
  },
  tab: {
    ...theme.mixins.tab,
    minWidth: 10,
    marginLeft: "5px"
  },
  avatar: {
    marginRight: "80px",
  },
  appBar: {
    height: "4rem",
    backgroundColor: 'green',
  },
  paper: {
    backgroundColor: "#f4f6f8",
  },
  cover: {
    height: '50px', 
    width:'100%',
    backgroundColor: ' #94c7ff',
  },
  imglogo: {
    marginLeft: 'auto',
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
  const user = auth.userId;

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const drawerMode = matches ? 'permanent' : 'persistent'  ;


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

  const handelLogout = () => {
    handleDrawerClose();
    auth.logout(); 
  }

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
        <Container maxWidth={FontFaceSetLoadEvent}>
         <AppBar position="fixed" className={classes.appBar}>
           {auth.isLoggedIn && 
          <Toolbar>
                      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{  width:'40px', ml: 0.1, ...(open && { display: 'none' }), }}
          >
            <MenuIcon sx={{fontSize:'large', ml: 0,pl:0, color:'white[500]',width:'30px',height:'80px'}}/>
          </IconButton>
          
              <img src={logo} alt="logo" className={classes.imglogo} />




          
          </Toolbar>
}
        </AppBar>

{auth.isLoggedIn && 
<Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={drawerMode}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Grid container
                direction="row"
                justify="space-between"
                alignItems="flex-start"   
                spacing={2}
                >
            <Grid item>
        {(user?.image !== undefined) &&  
               <Avatar alt="user name"      
                   src={`http://localhost:5000/${user.image.replaceAll('\\','/')}`}>
               </Avatar>          
          } 
          {(!user?.image || user?.image==='') && 
            <Avatar alt="user name">        
                   </Avatar> 
          } 
          </Grid>
          <Grid item mt={1.5}>

          <Typography
            color="textSecondary"
            gutterBottom
            noWrap
            variant="h6"
          
          >
           {`${user?.firstName} ${user?.lastName}` }
          </Typography>
          </Grid>

          <Grid item>

          {!matches && 
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          }
          </Grid>
          </Grid>
        </DrawerHeader>
        <Divider />
        <List>

          <Link to="/groups">
            <ListItem button key={'Groups'} onClick={handleDrawerClose}>
              <ListItemIcon>
                 <DashboardTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'My family board'} />
            </ListItem>
          </Link>

            <Link to="/family">
                <ListItem button key={'Family'} onClick={handleDrawerClose}>             
                      <ListItemIcon>
                        <LoyaltyTwoToneIcon sx={{color: 'blue'}}/> 
                      </ListItemIcon>
                      <ListItemText primary={'Family members'} />
                </ListItem>
            </Link>

            <Link to="/account">
            <ListItem button key={'Settings'} onClick={handleDrawerClose}>
              <ListItemIcon>
                 <PersonOutlineTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Account'} />
            </ListItem>
            </Link>

            
            <Link to="/settings">
            <ListItem button key={'Settings'} onClick={handleDrawerClose}>
              <ListItemIcon>
                 <SettingsTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItem>
            </Link>

            <Link to="/settings">
            <ListItem button key={'Report'} onClick={handleDrawerClose}>
              <ListItemIcon>
                 <TableChartTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Tasks report'} />
            </ListItem>
            </Link>
  
            <Link>
            <ListItem button key={'Logout'} onClick={handelLogout}>
              <ListItemIcon>
                 <ExitToAppTwoToneIcon sx={{color: 'blue'}}/> 
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
            </Link>
  
  
  
        </List>
      </Drawer>}

        </Container>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

export default MainHeader
