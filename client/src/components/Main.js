import React from 'react';
import { Routines, Home, MyRoutines, Activities, Header } from './index';
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
                <Route path='/myroutines' element={<MyRoutines/>}/>
            </Routes>
        </div>
    )
};

export default Main;

