import CourseProfileLink from '../components/courses/CourseProfileLink';
import LogoutBtn from '../components/ui/LogoutBtn';
import Button_SideIcon from '../components/ui/Button_SideIcon';
import UserStats from '../components/profile/UserStats';
import useAccountData from '../hooks/accounts/useAccountData';
import { useAccountContext } from '../context/AccountContext';
import AccountActivity from '../components/profile/AccountActivity';

export function Profile() {

    const getStreakStyle = (streak) => {
        if (streak >= 30) { return "invert(80%) sepia(100%) saturate(500%) hue-rotate(250deg)"; } 
        else if (streak >= 15) { return "invert(80%) sepia(100%) saturate(500%) hue-rotate(0deg)"; }  
        else if (streak >= 7) { return "invert(70%) sepia(100%) saturate(300%) hue-rotate(330deg)"; } 
        else if (streak >= 1) { return "invert(70%) sepia(100%) saturate(400%) hue-rotate(300deg)"; } 
        else { return "invert(70%) sepia(100%) saturate(100%) hue-rotate(180deg)"; }
    };

    const { 
        username,
        email,
        first_name,
        last_name,
        profile_picture,
        birth_date,
        date_joined,

        rol,
        last_check_in,
        daily_streak,
        longest_daily_streak,
        badges,
        points,
        level,

        language,
        contentProgress
    } = useAccountContext();
    
    const streakFilter = getStreakStyle(daily_streak);
    const { accountData, loading, error } = useAccountData();
    // console.log(accountData);

    return (
        <div className='page gap-30'>
            <div className="box row fullheight center gap-10 profile-data">
                <div className='box center fullwidth p10 gap-5 profile-data'>
                    {profile_picture ? (<img className='circleImage bigUserImage' src={profile_picture } alt="profile picture" />) : (
                        <img className='circleImage bigUserImage' src="/images/global/defaultUser.png" alt="profile picture" />
                    )}
                    <div className="box fullscreen start gap-10">
                        <div className="box">
                            {username ? (<label className='text-title2 font-LL'>{username}</label>) : (<label className='text-title2 font-LL'>Username</label> )}
                            {email ? (<label className='text-subtitle font-S'>{email}</label>) : (<label className='text-subtitle font-S'>username@email.com</label>)}
                        </div>
                    
                        <div className='start gap-5'>
                            <Button_SideIcon icon="/images/global/settings.png" text="Settings"/>
                            <LogoutBtn/>
                        </div>    
                    </div>
                </div>

                <UserStats courses='3' classes='13' exercises='9' streak={daily_streak}/>
            </div>




            <div className="box gap-20">
                <label className='text-title2'>Courses</label>
        
                <div className="box shadow-10 p20 radius-20 gap-20 profile-coursePanel">
                    <div className="box row gap-10">
                        <button className='button-square2' >Ongoing Courses</button>
                        <button className='button-square2 ' >Completed Courses</button>
                        <button className='button-square2' >Completed Exercise</button>
                    </div>

                    <div className="box text-left gap-20 profile-courses">  
                            <AccountActivity
                                contentProgress={contentProgress}
                            />
                            <CourseProfileLink 
                                name="Linear Algebra" 
                                description="Learn about vectors, matrices, and linear transformations. Master the fundamentals of linear algebra with interactive exercises." 
                                type="math" 
                                classes={10} 
                                finished={3}
                            />
                            <CourseProfileLink 
                                name="DataBase"
                                type="cs"
                                description="Learn about vectors, matrices, and linear transformations. Master the fundamentals of linear algebra with interactive exercises." 
                                classes={1} 
                                finished={1} 
                                completionDate="January, 1, 2025"/>
                            <CourseProfileLink classes={100} finished={92}/>
                            <CourseProfileLink type="physics" classes={145} finished={3}/>
                            <CourseProfileLink type="math" classes={31} finished={23}/>
                    </div>
                
                </div>
            </div>
            
            <style>{`
                .bigUserImage {
                    width: clamp( 180px, 20vw ,200px);
                    height: clamp( 180px, 20vw, 200px);
                    border: solid #aaa 3px;
                }
                .profile-coursePanel {
                    background-color: var(--panel1);                
                }
                .light .profile-coursePanel {
                    background-color: #fff3;
                }

                @media (min-width: 640px) {
                    .UserStats-streak { height: clamp(150px, 15vw, 220px); }
                    .profile-courses {
                        display: grid;
                        width: 100%;
                        grid-template-columns: repeat(2, 1fr);
                    }    
                }                

                @media (max-width: 880px) {
                    .profile-data {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}

export default Profile;
