export function Logo4() {
    return (
        <div className="logoContainer">
            <div className="logo logo-Dot blueDot">e</div>
            <div className="logo logo-text">ulerian </div>
            <div className="logo logo-Dot redDot">H</div>
            <div className="logo logo-text">ades</div>
            <style>{`  
                .logoContainer {
                    display: flex;
                    margin: 0;
                    font-size: 1em;
                    font-family: Comfortaa;
                    text-align: center;
                    font-weight: 800;
                }
                .logo-Dot {
                    margin: 0;
                    color: #fff;
                    border-radius: 100px;
                    align-self: center;
                    align-content: center;
                    text-align: center;
                    width: 25px;
                    height: 25px;
                }
                .logo-text {
                    margin: 0;
                    font-size: 12px;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 3px;
                    background-color: var(--alpha);
                }
                .blueDot {
                    margin: 0;
                    padding: 1px 7px;
                    background-color: var(--logoBg);
                    font-size: 16px;
                }
                .redDot {
                    font-size: 12px;
                    margin-left: 10px;
                    background-color: #ff4040;
                }
            `}</style>
        </div>
    );
};
export default Logo4;
