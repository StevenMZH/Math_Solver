import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../components/global/footer';
import CourseClass from './courseClass';
import UserCourse from '../components/profile/userCourse';
import AppHeader from '../components/global/appHeader';

export function UserProfile() {

    return (
        <div className='pageContainer'>
            <main>
                <div className='flex data-container'>
                    <div className='flex panelContainer userData-container'>
                        <img className='circleImage bigUserImage' src='/images/user2.png' alt="defaultUserImage" />
                        <div className="userInfo-container text-left">
                            <label>Username</label>
                            <p className='description text-justify'>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam possimus voluptate commodi non id illum maiores ducimus, architecto ipsa hic dignissimos debitis. Animi quaerat commodi cum voluptatem tempora qui vitae!</p>
                        </div>
                    </div>
                    <div className="panelContainer userProgress-container">
                        <label>Account Stats</label>
                        
                        <label className='text-focus'>Completed Classes: </label>
                        <label className='text-focus'>Solved Exercises: </label>
                        <label className='text-focus'>Ongoing Courses: </label>
                        <label className='text-focus'>Completed Courses: </label>
                    </div>
                </div>
                <div className='panelContainer userCourses-container'>
                    <label>Cursos Cursando</label>
                </div>

                <style>{`
                    main {
                        display: flex;
                        flex-direction: column;
                        justify-content: start;
                        align-items: start;
                        gap: 10px;
                    }

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
                        width: 400px;
                        display: flex;
                        flex-direction: column;
                        text-align: left;
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
