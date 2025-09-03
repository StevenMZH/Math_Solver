import { createContext, useContext, useState, useEffect } from 'react';
import useAccountData from '../hooks/accounts/useAccountData';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const { accountData, loading, error } = useAccountData();

    // User Info
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [first_name, setFirst_name] = useState(null);
    const [last_name, setLast_name] = useState(null);
    const [profile_picture, setProfile_picture] = useState(null);
    const [birth_date, setBirth_date] = useState(null);
    const [date_joined, setDate_joined] = useState(null);

    // Account Info
    const [rol, setRol] = useState(null);

    const [last_check_in, setLast_check_in] = useState(null);
    const [last_activity, setLast_activity] = useState(null); 
    const [daily_streak, setDaily_streak] = useState(0); 
    const [longest_daily_streak, setLongest_daily_streak] = useState(0); 
    const [badges, setBadges] = useState(null); 
    const [points, setPoints] = useState(0); 
    const [level, setLevel] = useState(1);

    // Preferences
    const [language, setLanguage] = useState('en');
    const [theme, setTheme] = useState('dark');
    const [notifications, setNotifications] = useState(null);

    // Content
    const [contentProgress, setContentProgress] = useState(null);

    // console.log(accountData)

    useEffect(() => {
        if (accountData) {
            setUsername(accountData.username);
            setEmail(accountData.email);
            setFirst_name(accountData.first_name);
            setLast_name(accountData.last_name);
            setProfile_picture(accountData.profile_picture || '/images/global/defaultUser.png');
            setBirth_date(accountData.birth_date);
            setDate_joined(accountData.date_joined);

            setRol(accountData.rol);
            setLast_check_in(accountData.last_check_in);
            setLast_activity(accountData.last_activity);
            setDaily_streak(accountData.daily_streak);
            setLongest_daily_streak(accountData.longest_daily_streak);
            setBadges(accountData.badges);
            setPoints(accountData.points);
            setLevel(accountData.level);
            
            setLanguage(accountData.language);
            setTheme(accountData.theme);
            setNotifications(accountData.notifications);

            setContentProgress(accountData.contentProgress);
        }
    }, [accountData]);

    return (
        <AccountContext.Provider value={{
            username, setUsername,
            email, setEmail,
            first_name, setFirst_name,
            last_name, setLast_name,
            profile_picture, setProfile_picture,
            birth_date, setBirth_date,
            date_joined, setDate_joined,

            rol, setRol,
            last_check_in, setLast_check_in,
            last_activity, setLast_activity,
            daily_streak, setDaily_streak,
            longest_daily_streak, setLongest_daily_streak,
            badges, setBadges,
            points, setPoints,
            level, setLevel,
            
            language, setLanguage,
            theme, setTheme,
            notifications, setNotifications,

            contentProgress, setContentProgress,
        }}>
            {children}
        </AccountContext.Provider>
    );
};
export const useAccountContext = () => useContext(AccountContext);
