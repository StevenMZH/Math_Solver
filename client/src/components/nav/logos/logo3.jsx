export function Logo3() {
    return (
        <div className="logoContainer">
            <div className="logo logo-Dot blueDot">e</div>
            <div className="logo logo-text">ulerian </div>
            <div className="logo logo-Dot redDot">H</div>
            <div className="logo logo-text">ades</div>
            <style>{`  
                .header {
                    padding-top: 10px;
                }

                .logoContainer {
                    display: flex;
                    margin: 0;
                    font-size: 1em;
                    font-family: Comfortaa;
                    text-align: center;
                    margin-right: 50px;
                }
                .logo-Dot {
                    margin: 0;
                    color: #fff;
                    border-radius: 100px;
                    align-self: center;
                    align-content: center;
                    text-align: center;
                    width: 28px;
                    height: 28px;
                }
                .logo-text {
                    margin: 0;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 3px;
                    background-color: var(--alpha);
                }
                .blueDot {
                    margin: 0;
                    padding: 1px 7px;
                    background-color: var(--logoBg);
                    font-size: 20px;
                }
                .redDot {
                    font-size: 0.9em;
                    margin-left: 10px;
                    padding-top: 2px;
                    background-color: #ff4040;
                }
            `}</style>
        </div>
    );
};
export default Logo3;
