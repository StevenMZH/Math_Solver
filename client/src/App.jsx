import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import CoursesHub from './pages/coursesHub';
import Exercises from './pages/exercises';
import Articles from './pages/articles';

import Algebra from './pages/algebra';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />}/>
                <Route path="/home" element={<Home/>}/>

                <Route path='/courses' element={<CoursesHub/>}/>
                <Route path='/exercises' element={<Exercises/>}/>
                <Route path='/articles' element={<Articles/>}/>

                <Route path='/algebra' element={<Algebra/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
