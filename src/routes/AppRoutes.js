import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ItemsPage from '../pages/ItemsPage';
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/*<Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } >

                    <Route path="items" element={<ItemsPage />} />
                </Route>*/}

            </Routes>
        </BrowserRouter >
    );
}
