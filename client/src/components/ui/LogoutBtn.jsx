import { useNavigate } from 'react-router-dom';
import Button_SideIcon from './Button_SideIcon';

export function LogoutBtn() {
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload()
    };

    return (
        <>
            <Button_SideIcon className="Button_LogOut" icon="/images/global/logout.png" text="Log Out" func={handleLogout}/>
            <style>{`
                .Button_LogOut { background-color:rgb(176, 46, 46); color: var(--text_light2); }
                .Button_LogOut:hover { background-color:rgb(196, 91, 91); }
                .Button_LogOut .img-themes { filter: invert(70%) sepia(100%) saturate(0%) hue-rotate(180deg);
 }
            `}</style>
        </>
    );
}
export default LogoutBtn;
