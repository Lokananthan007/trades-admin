import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidemenubar from './navbar/Sidemenubar';
import Login from './login/Login';
import PrivateRoute from './rout/PrivateRoute';
import Withdraw from './components/Withdraw';
import { Navigate } from 'react-router-dom';
import './App.css';
import Data from './components/Data';
import Qr from './components/Qr';
import Reguser from './components/Reguser';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidemenubar /> 
          <Routes>
            <Route path="" element={<Login />} />
            <Route
              path="/Data"
              element={
                <PrivateRoute>
                  <Data/>
                </PrivateRoute>
              }
            />
            <Route
              path="/Withdraw"
              element={
                <PrivateRoute>
                  <Withdraw/>
                </PrivateRoute>
              }
            />
            <Route
              path="/Qr"
              element={
                <PrivateRoute>
                  <Qr/>
                </PrivateRoute>
              }
            />
            <Route
              path="/reg"
              element={
                <PrivateRoute>
                  <Reguser/>
                </PrivateRoute>
              }
            />
            
            <Route path="*" element={<Navigate to="" />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;