import {createContext, useState, useEffect, useCallback} from 'react';
import {useHttpClient} from "../hooks/http-hook";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null, 
    userId: null,
    user: null, 
    familyMembers: [],
    login: () => {},
    logout: () => {},   
    updateUserDetails: () => {},
    
});

export const AuthContextProvider = (props) => {

    const { isLoading, error, sendRequest, clearError  } = useHttpClient();
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState({});
    const [loadedUsers, setLoadedUsers] = useState([]);

    const login = useCallback((user, token, expirationDate) => {
        setToken(token);
        setUserId(user);
        fetchMembers();

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
          'userData',
          JSON.stringify({
                          userId: user, 
                          token: token,
                          expiration: tokenExpirationDate.toISOString(),
                        })
        );
    }, []); 

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []); 
 
    const updateUserDetails = useCallback((user) => {
        setUserId(user);
    }, []);
    
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
  
      if (storedData && 
          storedData.token &&
          new Date(storedData.expirationDate) > new Date()
          ) {
         login(storedData.userId, storedData.token);
      }
    }, [login]);

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

  
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token,
        token: token,  
        userId: userId,
        familyMembers: loadedUsers,
        login: login, 
        logout: logout,
        updateUserDetails: updateUserDetails,
     }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;