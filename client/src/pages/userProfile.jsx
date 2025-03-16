import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../components/global/footer';
import HomeNav from '../components/nav/homeNav';
import CourseClass from './courseClass';
import UserCourse from '../components/profile/userCourse';

export function UserProfile() {

    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
            </header>

            <main>

                <div className='flex data-container'>
                    <div className='flex userData-container panelContainer'>
                        <img className='circleImage bigUserImage' src='/images/user2.png' alt="defaultUserImage" />
                        <div className="userInfo-container text-left">
                            <label>Username</label>
                            <p className='description text-justify'>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus voluptate commodi non id illum maiores ducimus, architecto ipsa hic dignissimos debitis. Animi quaerat commodi cum voluptatem tempora qui vitae!</p>
                        </div>
                    </div>
                    <div className="panelContainer userProgress-container">
                        <div className=''>Cursos en Proceso: n</div>
                        <div>Cursos Terminados: n</div>
                    </div>
                </div>
                <div className='panelContainer userCourses-container'>
                    <label>Cursos Cursando</label>
                </div>

                <style>{`
                    .flex {
                        display: flex;
                    }
                    .text-left {
                        text-align: left;
                    }
                    .text-justify {
                        text-align: justify;
                    }
                    .userInfo-container {
                        padding: 10px 20px;
                    }

                    .data-container {
                        width: 100%;
                        gap: 10px;
                    }

                    .userData-container {
                        width: 100%;
                    }

                    .description {
                        margin-top: 10px;
                        font-size: 12px;
                    }

                    .userProgress-container {
                        font-size: 14px;
                    }
                    
                    .userData-container {
                    }
                `}</style>
            </main>

            <Footer />
        </div>
    );
}

export default UserProfile;
