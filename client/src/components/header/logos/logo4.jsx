export function Logo4() {
    return (
        <div className="logo-container" id="logo4">
            <div className="logo logo-Dot blueDot">e</div>
            <div className="logo logo-text">ulerian </div>
            <div className="logo logo-Dot redDot">H</div>
            <div className="logo logo-text">ades</div>
            <style>{`  
                #logo4 {
                    display: flex;
                    margin: 0;
                    font-size: 1em;
                    font-family: Comfortaa;
                    text-align: center;
                    font-weight: 800;
                }
                #logo4 .logo-Dot {
                    margin: 0;
                    color: #fff;
                    border-radius: 100px;
                    align-self: center;
                    align-content: center;
                    text-align: center;
                    width: 25px;
                    height: 25px;
                    line-height: 0;
                }
                #logo4 .logo-text {
                    margin: 0;
                    font-size: 12px;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 3px;
                    background-color: var(--alpha);
                }
                #logo4 .blueDot {
                    margin: 0;
                    padding: 0px 7px;
                    padding-bottom: 1px;
                    background-color: #3366ff;
                    font-size: 16px;
                }
                #logo4 .redDot {
                    font-size: 12px;
                    margin-left: 10px;
                    background-color: #ff3366;
                    padding-top: 2px;
                }
            `}</style>
        </div>
    );
};
export default Logo4;
