import { Link } from 'react-router-dom';

export function UserPanel() {
    return (
        <div className="flexCenter userPanel-container a-noHover">
            <Link to="/profile">
                <img className='circleImage userImage' src='/images/user2.png' alt="defaultUserImage" />
            </Link>

            <style>{`
                .userButton {
                    background-color: #00000000;
                }
                .userButton:hover {
                    background-color: #00000000;
                }
                .userImage {
                    width: 40px;
                    height: 40px;
                    background-color: #0000;
                }

                .a-noHover a{
                    background-color: #0000;
                    border: 2px solid #0000;
                }
                .a-noHover a:hover {
                    background-color: #0000;
                    border: 2px solid #0000;
                }

            `}</style>
        </div>
    );
};
export default UserPanel;
