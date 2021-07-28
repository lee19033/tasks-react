import React, {useState, useCallback, useContext, useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import {useHttpClient} from "./hooks/http-hook";
import BasicTable from './components/groups/Groups';
import MainHeader from './components/header/MainHeader';
import GlobalStyles from './components/GlobalStyles';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Register from './components/login/Register';
import { AuthContext } from './context/auth-context';
import Login from './components/login/Login';
import theme from './theme';
import TasksBoard from './components/tasks/taskBoard';
import Users from './components/users/users';
import EditTask from './components/tasks/EditTask';




const App = () =>  {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, error, sendRequest, clearError  } = useHttpClient();
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]); 
  const [tasks, setTasks] = useState([]);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);


  const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
        fetchMembers();
        setFamilyMembers(loadedUsers); //get members 
  }, []); 

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []); 

    const fetchMembers = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/users`
            );
            setLoadedUsers(responseData.users);       
        }
        catch (err) {
            console.log(err);
        }
    }

 

  const saveGroupHandler = (saveGroupData) => {
    console.log('lilach');
    
    setData((prevData) => {
        return [saveGroupData, ...prevData];
    });      

  }

  const saveTaskHandler = (saveTaskData) => {
    console.log(`as${saveTaskData}`);
    setTasks((prevData) =>  {
      //return [saveTaskData, ...prevData];
      return [...prevData, saveTaskData];
    });
  }
  let routes=""; 

  if (isLoggedIn) {
    routes = (
      <Switch>
            <Route path="/" exact render={() => (<DashboardLayout tasks={tasks} onSaveTaskHandler={saveTaskHandler}/>)}  />
            <Route path="/groups"  render={() => (<DashboardLayout tasks={tasks} onSaveTaskHandler={saveTaskHandler}/>)} />
            <Route path="/settings" component={BasicTable} />
            <Route path="/:groupId/tasks/:groupName" exact>
                <TasksBoard />
            </Route>
            <Route path="/newtasks/:id/group/:groupName/name/:taskName" exact>
                  <EditTask />
            </Route>
            <Redirect to="/groups"></Redirect>
        </Switch>
    );
  } else {
    routes = (
      <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Redirect to="/login"></Redirect>
     </Switch>
    );
  }

  return (

    <ThemeProvider theme={theme} >
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn,
                                     userId: userId,
                                     familyMembers: loadedUsers,
                                     login: login, 
                                     logout: logout 
                                  }}>
              <BrowserRouter>
                    <MainHeader items={data} onSaveGroup={saveGroupHandler} />
                      {routes}     
              </BrowserRouter>
    </AuthContext.Provider>

    </ThemeProvider>
  );
}

export default App;
