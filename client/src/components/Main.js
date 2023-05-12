import React from 'react';
import { Routines, Home, MyRoutines, Activities, Header, Login, Register } from './index';
import { Routes, Route } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/routines' element={<Routines />}/>
                <Route path='/me' element={<MyRoutines />}/>
                <Route path='/activities' element={<Activities/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
    )
};

export default Main;
