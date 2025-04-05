import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useState } from "react";
import Footer from './components/global/Footer';
import { FailLoad_Message, NotFound_Message } from './components/assets/errorMessages';
import LoadingScreen, { Loading_floatingPanel } from './components/assets/TransitionPages';
import InDev from './pages/InDev';

const Home = lazy(() => import("./pages/Home"));

const CoursesHub = lazy(() => import("./pages/CourseHub"));
const Course = lazy(() => import("./pages/Course"));
const CourseClass = lazy(() => import("./pages/CourseClass"));
const Class = lazy(() => import("./pages/Class"));

const Solver = lazy(() => import("./pages/Solver"));
const Exercises = lazy(() => import("./pages/Exercises"));

const Algebra = lazy(() => import("./pages/Algebra"));

const UserProfile = lazy(() => import("./pages/Profile"));
const ProtectedRoute = lazy(() => import("./components/global/ProtectedRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Header = lazy(() => import("./components/global/Header"));

function App() {
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [failPageLoad, setFailPageLoad] = useState(false);

    return (
        <BrowserRouter>
            <header>
                <Suspense fallback={<div></div>}>
                    <Header/>
                </Suspense>
            </header>

            <main>
        
                    <Suspense fallback={<div></div>} onError={() => setFailPageLoad(true)}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<Home />} />

                            <Route path="/courses" element={<CoursesHub />} />
                            <Route path="/courses/:courseId" element={<Course/>} />
                            <Route path="/courses/:courseId/:classId" element={<CourseClass  />} />
                            <Route path="/classes/:classId" element={<Class />} />

                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <UserProfile />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="/exercises" element={<InDev/>} />
                            <Route path="/solver" element={<Solver />} />
                            <Route path="/algebra" element={<Algebra />} />


                            <Route path="*" element={<NotFound/>} />
                        </Routes>

                        <Footer/>

                    </Suspense>

            </main>


        </BrowserRouter>
    )
}

export default App;
