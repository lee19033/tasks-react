import React from 'react';
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import ErrorDialog from "../../components/alerts/ErrorDialog";
import {useHttpClient} from "../../hooks/http-hook"; 
import TaskList from "../../components/tasks/TaskList";
import CircularProgress from '@material-ui/core/CircularProgress';

/*function tasksReducer(state, action) {
    let rowIndex = 0; 
    switch(action.type) {
      case 'create': 
        console.log('create');
        return [...state,action.task]
      case 'add':
        return [...state, action.task];

      case 'remove':
         rowIndex = state.findIndex(item => item.id === action.id);
        if (rowIndex < 0) {
          return state;
        }
        const update = [...state];
        update.splice(rowIndex, 1);
        return update;

      case 'update': 
        rowIndex = state.findIndex(item => item.id === action.row.id);
        if (rowIndex < 0) {
            return state;
        }
        const updateRow = [...state];
        updateRow.splice(rowIndex, 1, action.row);
        return updateRow;
      default:
        return state;
    }
  }
*/  

const TaskBoard = (props) => {
     
    const [loadedTasks, setLoadedTasks] = useState('');
    //const [loadedTasks, setLoadedTasks] = useReducer(tasksReducer, []);
    const { isLoading, error, sendRequest, clearError  } = useHttpClient();
    const groupId = useParams().groupId; 
    const groupName = useParams().groupName; 

    
    function create(tasks) {
        setLoadedTasks({tasks, type: 'create'});
    }

    function add(task) {
        setLoadedTasks({ task, type: 'add' });
      }
    
      function remove(id) {
          setLoadedTasks({ id, type: 'remove' });
      }

      function update(task) {
        setLoadedTasks({ task, type: 'update'})
      }    

      const handleAddNewTask = (taskData) => {
        add(taskData);                
    }

    const saveTask = (taskData) => {   
        update(taskData);
    }

    const handleRemoveTask = (task) => {
        remove(task);
    }

    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/tasks/group/${groupId}`
                );
                setLoadedTasks(responseData.tasks); 
                //responseData.tasks.map(task => {
                 //   add(task);
               // })
                //
                //setLoadedTasks(responseData.task, 'type:create');   
                //create(responseData.tasks);              
            }
            catch (err) {
                console.log(err);
            }

        };
        fetchTasks();
    }, [sendRequest]);
    
    
    const submitTask = (taskData) => {
          console.log(taskData); 
          console.log('lilach1'); 
          setLoadedTasks(...prevState => ( {
              array: [...prevState.array, taskData]
          }));  

    };
    

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

           {!isLoading && loadedTasks &&  <TaskList items={loadedTasks} 
                                                    name={groupName} 
                                                    groupId={groupId}  
                                                    onSaveTaskHandler={handleAddNewTask} 
                                                    removeTask={handleRemoveTask}
                                                    updateTask={saveTask}
                                                    />}
        </React.Fragment>
    );
}

export default TaskBoard; 

