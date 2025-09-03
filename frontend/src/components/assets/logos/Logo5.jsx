export function Logo5() {
    return (
        <div className="logo-container" id="logo5">
            <div className="logo logo-Dot blueDot">e</div>
            <div className="logo logo-Dot redDot">H</div>
            <style>{`  
                #logo5 {
                    display: flex;
                    font-size: 1em;
                    font-family: Comfortaa;
                    text-align: center;
                    font-weight: 800;
                    justify-content: start;
                    height: 35px
                }
                #logo5 .logo-Dot {
                    margin: 0;
                    color: #fff;
                    border-radius: 100px;
                    align-self: center;
                    align-content: center;
                    text-align: center;
                    width: 25px;
                    height: 25px;
                }
                #logo5 .logo-text {
                    margin: 0;
                    font-size: 12px;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 3px;
                    background-color: var(--alpha);
                }
                #logo5 .blueDot {
                    margin: 0;
                    padding: 0px 7px;
                    padding-bottom: 1px;
                    background-color: #3366ff;
                    font-size: 16px;
                    align-self: start;
                }
                #logo5 .redDot {
                    font-size: 12px;
                    padding-top: 3px;
                    background-color: #ff3366;
                    align-self: end;
                }
            `}</style>
        </div>
    );
};
export default Logo5;
