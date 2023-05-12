import React from 'react';
import { Routines, Home, MyRoutines, Activities, Header, Login, Register } from './index';
import { Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
=======


>>>>>>> f4a46b23612bd86c4443068320ac0569dd713e19
const Main = () => {
    

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/routines' element={<Routines />}/>
                <Route path='/me' element={<MyRoutines />}/>
                <Route path='/activities' element={<Activities/>}/>
<<<<<<< HEAD
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
=======
                <Route path='/myroutines' element={<MyRoutines/>}/>
>>>>>>> f4a46b23612bd86c4443068320ac0569dd713e19
            </Routes>
        </div>
    )
};

export default Main;
