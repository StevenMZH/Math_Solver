import { Link } from 'react-router-dom';

export function SidePanel() {
    return (
        <div className="flexCenter sidePanel-container">
            <div className="sidePanel">
                <div className='userData'>
                    <img className='circleImage userImage' src='/images/user2.png' alt="defaultUserImage" />
                </div>

                <div className='sidePanel-buttons'>
                    <SidePanel_button content="Profile" imageURL="/images/user2.png" linkURL="/profile" />
                    <SidePanel_button content="Knowledge Tree" imageURL="/images/user2.png" linkURL="/profile" />
                    <SidePanel_button content="My Courses" imageURL="/images/user2.png" linkURL="/profile" />
                    <SidePanel_button content="Log Out" imageURL="/images/user2.png" linkURL="/profile" />
                </div>

            </div>

            <style>{`
                .sidePanel-container {
                    display: flex;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    justify-content: end;
                    z-index:2000;
                }
                .sidePanel {
                    display: flex;
                    flex-direction: column;
                    background-color: #0c0c0c50;
                    width: 300px;
                    height: 100%;
                    padding: 15px 20px;
                }
                .sidePanel-buttons {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .sidePanel-button {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 13px;    
                }

                .userImage {
                    width: 40px;
                    height: 40px;
                    background-color: #0000;
                    border: 2px solid #0000;
                }
                .userImage:hover {
                    background-color: #0000;
                    border: 2px solid #0000;
                }

            `}</style>
        </div>
    );
};
export default SidePanel;


export function SidePanel_button({content, imageURL, linkURL}) {
    return (
        <Link to={linkURL}>
            <div className='sidePanel-button'>
                <img className='circleImage userImage' src={imageURL} alt="icon" />
                <label className='text-title'>{content}</label>
            </div>
        </Link>
    );
}

