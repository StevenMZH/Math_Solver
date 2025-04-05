import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserCourse from '../components/profile/UserCourse';
import LogoutBtn from '../components/profile/LogoutBtn';

export function UserProfile() {

    return (
        <div className='page-container'>
                <div className='flex data-container'>
                    <div className='flex panelContainer userData-container'>
                        <img className='circleImage bigUserImage' src='/images/user2.png' alt="defaultUserImage" />
                        <div className="userInfo-container text-left">
                            <div className='first'>
                                <label className='text-title2'>Username</label>
                                <label className='tag'>Admin</label>
                            </div>
                            
                            <label className='text-focus'>name.lastname@gmail.com</label>
                            <LogoutBtn/>
                        </div>
                    </div>
                    <div className="panelContainer userProgress-container">
                        <label className='text-title2'>Account Stats</label>
                        
                        <div className='grid'>
                            <div className="column">
                                <label className='text-focus'>Completed Courses</label>
                                <label className='text-title'>10</label>
                            </div>

                            <div className="column">
                                <label className='text-focus'>Completed Classes</label>
                                <label className='text-title'>67</label>
                            </div>

                            <div className="column">
                                <label className='text-focus'>Solved Exercises:</label>
                                <label className='text-title'>31</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='panelContainer data-container userCourses-container'>
                    <label>Ongoing Courses</label>
                </div>

                <style>{`
                    .page-container {
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
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        justify-content: center;
                        padding: 10px 20px;
                    }
                    .userInfo-container .first{
                        display: flex;
                        align-items: center;
                    }
                    .userInfo-container .text-title2{
                        font-size: 20px;
                    }
                    .userInfo-container .tag {
                        margin-left: 7px;
                        font-size: 10px;
                        padding: 3px 5px;
                        background-color:rgb(109, 14, 14);
                        border-radius: 20px;
                    }
                    .userInfo-container button {
                        margin-top: 10px;
                    }

                    .data-container {
                        width: 100%;
                        gap: 10px;
                    }

                    .userData-container {
                        width: 400px;
                        min-width: 400px;
                        max-width: 400px;
                    }

                    .bigUserImage {
                        width: 140px;
                        height: 140px;
                        border: #f00 100px;
                    }

                    .userProgress-container {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        font-size: 14px;
                    }
                    .userProgress-container .grid {
                        display: grid;
                        width: 100%;
                        height: 100%;
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .userProgress-container .grid .column {
                        display: flex;
                        gap: 10px;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .userProgress-container .text-title {
                        font-size: 60px;
                        font-weight: bolder;    
                        color: #90c5dc;
                    }

                    .userCourses-containe {
                        width: 100%:
                    }

                `}</style>
        </div>
    );
}

export default UserProfile;
