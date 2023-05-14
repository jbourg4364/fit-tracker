import React, {useState, useEffect} from 'react';
import { Routines, Home, MyRoutines, Activities, Header, Login, Register } from './index';
import { Routes, Route } from 'react-router-dom';
import { getMe } from '../api-client/auth';
const Main = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
          if (token) {
            const fetchedUser = await getMe(token);
            if (fetchedUser) {
              setUser(fetchedUser);
              setIsLoggedIn(true);
            }
          }
        };
        fetchUser();
      }, [token]);
      useEffect(() => {
        console.log(user);
      }, [user]);
    return (
        <div>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}/>
            <Routes>
                <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
                <Route path='/routines' element={<Routines user={user} isLoggedIn={isLoggedIn} />}/>
                <Route path='/me' element={<MyRoutines />}/>
                <Route path='/activities' element={<Activities isLoggedIn={isLoggedIn}/>}/>
                <Route path='/myroutines' element={<MyRoutines token={token} user={user}/>}/>
                <Route path='/login' element={
                    <Login 
                        token={token} 
                        setToken={setToken} 
                        user={user} 
                        setUser={setUser} 
                        isLoggedIn={isLoggedIn} 
                        setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
    )
};

export default Main;
