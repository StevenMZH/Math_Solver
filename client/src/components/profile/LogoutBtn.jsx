import { useNavigate } from 'react-router-dom';

export function LogoutBtn() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload()
    };

    return (
        <div className="LogoutBtn-container">
            <button className='text-title logoutBtn' onClick={handleLogout}>Log Out</button>
            <style>{`
                .logoutBtn {
                    background-color:rgb(176, 46, 46);
                    padding: 6px 8px;
                    border-radius: 5px;    
                }

                .logoutBtn:hover {
                    background-color:rgb(196, 91, 91);
                }
            `}</style>
        </div>
    );
}
export default LogoutBtn;
