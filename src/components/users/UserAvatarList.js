import * as React from 'react';
import {useContext} from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/core/AvatarGroup';
import Stack from '@material-ui/core/Stack';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { red, orange, green, blue } from '@material-ui/core/colors';
import { AuthContext } from '../../context/auth-context';

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const colors = [green[600],red[600],orange[600],blue[600]]; 


const UserAvatarList = (props)  => {
  const [checked, setChecked] = React.useState([1]);
  const membersList = useContext(AuthContext);
  console.log(membersList.familyMembers);

  console.log(props.users);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
      <React.Fragment>
          <AvatarGroup>

      {membersList.familyMembers.filter((member => props.users.includes(member.id))).map((value) => {           
        return (
              <Avatar
                alt={`Avatar n°${value.firstName}`}               
                sx={{ width:24, height:24, bgcolor: colors[colors.length * Math.random() | 0], verticalAlign: 'center'}}
              >{(value.firstName.substr(0,1).toUpperCase())}
                  </Avatar>            
        );
      })}
      
      </AvatarGroup>
      </React.Fragment>
  );
}

export default UserAvatarList;