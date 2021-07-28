import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';

import GroupList from "./groups/GroupList";
import GroupsDashboard from "./groups/GroupsDashboard";

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 120
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 auto',
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});


const DashboardLayout = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  
  const saveTaskHandler = (taskData) => {
    props.onSaveTaskHandler(taskData);
  }
  
  return (
    <DashboardLayoutRoot>
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <GroupsDashboard tasks={props.tasks} onSaveTaskHandler={saveTaskHandler}/>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
