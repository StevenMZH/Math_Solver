import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';

import CoursesHub from './pages/coursesHub';
import Course from './pages/course';

import CourseClass from './pages/courseClass';
import Class from './pages/class';

import Solver from './pages/solver';
import Exercises from './pages/exercises';

import Algebra from './pages/algebra';
import Login from './pages/login';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotten-password" element={<Login />} />

                <Route path='/courses' element={<CoursesHub />} />
                <Route path="/courses/:courseId" element={<Course />} />
                <Route path="/courses/:courseId/:classId" element={<CourseClass />} />
                <Route path="/classes/:classId" element={<Class />} />

                <Route path='/exercises' element={<Exercises />} />
                <Route path='/solver' element={<Solver />} />

                <Route path='/algebra' element={<Algebra />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
