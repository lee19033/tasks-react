import React from 'react'; 

import UserItem from './UserItem.js';


const UsersList = props  => {
    if (props.items.length === 0) {
        return(
            <div>
            <h2>No users found!</h2>
            </div>
        )
    }
    return (
        <ul>
            {props.items.map(user => {
             return  <UserItem 
                key={user.id} 
                id={user.id} 
                name={user.name}
                image = {user.image} />
            })
        }
        </ul>
    )
}

export default UsersList; 