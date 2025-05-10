import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleCallback from './components/access/GoogleCallback';
import AccessPanel from './components/access/AccessPanel';

// Lazy loading de los componentes
const Footer = lazy(() => import('./components/global/Footer'));
const InDev = lazy(() => import('./pages/InDev'));
const MobileNav = lazy(() => import('./components/mobile/MobileNav'));
const MobileHeader = lazy(() => import('./components/mobile/MobileHeader'));

const Home = lazy(() => import("./pages/Home"));
const CoursesHub = lazy(() => import("./pages/CourseHub"));
const Course = lazy(() => import("./pages/Course"));
const CourseClass = lazy(() => import("./pages/CourseClass"));
const Class = lazy(() => import("./pages/Class"));

const Solver = lazy(() => import("./pages/Solver"));
const Exercises = lazy(() => import("./pages/Exercises"));

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
                    <Header />
                    <MobileHeader />
                </Suspense>
            </header>

            <main>
                <Suspense fallback={<div></div>} onError={() => setFailPageLoad(true)}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/google-callback" element={<GoogleCallback/>} />

                        <Route path="/home" element={<Home />} />

                        <Route path="/courses" element={<CoursesHub />} />
                        <Route path="/courses/:courseId" element={<Course />} />
                        <Route path="/courses/:courseId/:classId" element={<CourseClass />} />
                        <Route path="/classes/:classId" element={<Class />} />

                        <Route path="/profile" element={ <ProtectedRoute> <UserProfile /> </ProtectedRoute> } />

                        <Route path="/exercises" element={<InDev />} />
                        <Route path="/solver" element={<Solver />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>            
                </Suspense>

                <Suspense fallback={<div></div>}>
                    <Footer />
                </Suspense>

                <Suspense fallback={<div></div>}>
                    <MobileNav />
                </Suspense>

                <AccessPanel/>
            </main>
        </BrowserRouter>
    );
}

export default App;
