// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import StudentList from './components/Student/StudentList';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<PrivateRoute element={StudentList} />}/>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
