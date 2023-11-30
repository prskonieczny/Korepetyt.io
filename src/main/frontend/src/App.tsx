import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import RootLayout from './rootLayout/RootLayout';
import HomePage from "./pages/HomePage";
import LoginPage from './pages/Authorization/LoginPage';
import RegisterStudentPage from './pages/Authorization/RegisterStudentPage';
import RegisterTeacherPage from './pages/Authorization/RegisterTeacherPage';
import NotFoundPage from "./pages/NotFound/NotFoundPage";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="registerStudent" element={<RegisterStudentPage />} />
    <Route path="registerTeacher" element={<RegisterTeacherPage />} />
      <Route path="*" element={<NotFoundPage />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
