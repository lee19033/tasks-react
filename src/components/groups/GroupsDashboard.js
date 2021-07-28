import React, { useState, useEffect } from 'react';

import GroupList from "../groups/GroupList";
import ErrorDialog from "../../components/alerts/ErrorDialog";
import {useHttpClient} from "../../hooks/http-hook"; 
import CircularProgress from '@material-ui/core/CircularProgress';

const GroupsDashboard = (props) => {
     
    const [loadedGroups, setLoadedGroups] = useState('');
    const { isLoading, error, sendRequest, clearError  } = useHttpClient();

    
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/groups'
                );
                setLoadedGroups(responseData.groups);                 
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchGroups();
    }, [sendRequest]);

    

    const saveGroupHandler = (saveGroupData) => {
        console.log("submit!");
        console.log(saveGroupData);
        props.onSaveGroup(saveGroupData);
        //handleClose();
        /*setData((prevData) => {
            return [saveGroupData, ...prevData];
        }); */     
    }
        
    return (
        <React.Fragment>
           { (error) && 
              <ErrorDialog open={true} error={error} onClose={clearError}/>
           }
           {isLoading && <CircularProgress color="primary"/>}

           {!isLoading && loadedGroups &&  <GroupList items={loadedGroups} tasks={props.tasks} onSaveGroup={saveGroupHandler}/>}
        </React.Fragment>
    );
}

export default GroupsDashboard; 