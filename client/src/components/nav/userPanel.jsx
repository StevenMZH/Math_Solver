export function UserPanel() {
    return (
        <div className="flexCenter userPanel-container">
            <button className="userButton">
                <img className='circleImage userImage' src='../../../public/images/user2.png' alt="defaultUserImage" />
            </button>

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
                    background-color: var(--imageBg);
                }
            `}</style>
        </div>
    );
};
export default UserPanel;
