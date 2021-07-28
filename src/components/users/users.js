import React, { useState, useEffect } from 'react';
import UsersList from "./UsersList"; 
import ErrorDialog from "../../components/alerts/ErrorDialog";
import {useHttpClient} from "../../hooks/http-hook"; 
import CircularProgress from '@material-ui/core/CircularProgress';


const Users = () => {
     
    const [loadedUser, setLoadedUsers] = useState('');
    const { isLoading, error, sendRequest, clearError } = useHttpClient(); 
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users'
                );
                setLoadedUsers(responseData.users);                 
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, [sendRequest]);
    
    return (
        <React.Fragment>
           { (error) && 
              <ErrorDialog open={true} error={error} onClose={clearError}/>
           }
           {isLoading && <CircularProgress color="primary"/>}

           {!isLoading && loadedUser &&  <UsersList items={loadedUser} />}
        </React.Fragment>
    );
}

export default Users; 