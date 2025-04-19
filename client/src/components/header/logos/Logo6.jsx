export function Logo6() {
    return (
        <div className="logo-container" id="logo6">
            <div className="segment">
                <div className="logo logo-Dot blueDot bigDot">e</div>
                <div className="miniSegment">
                    <div className="logo logo-Dot blueDot miniDot">u</div>
                    <div className="logo logo-Dot blueDot miniDot">l</div>
                    <div className="logo logo-Dot blueDot miniDot">e</div>
                    <div className="logo logo-Dot blueDot miniDot">r</div>
                    <div className="logo logo-Dot blueDot miniDot">i</div>
                    <div className="logo logo-Dot blueDot miniDot">a</div>
                    <div className="logo logo-Dot blueDot miniDot">n</div>
                </div>
            </div>

            <div className="segment">        
                <div className="logo logo-Dot redDot bigDot">H</div>
                <div className="miniSegment">            
                    <div className="logo logo-Dot redDot miniDot">a</div>
                    <div className="logo logo-Dot redDot miniDot">d</div>
                    <div className="logo logo-Dot redDot miniDot">e</div>
                    <div className="logo logo-Dot redDot miniDot">s</div>
                 </div>   
            </div>
            
            <style>{`  
                #logo6, #logo6 .segment {
                    display: flex;
                    flex-direction: row;
                    margin: 0;
                    font-family: Comfortaa;
                    text-align: center;
                    font-weight: 500;
                    gap: clamp(10px, 2vw, 25px);
                    margin-bottom: 10px;
                }
                #logo6 .segment {
                    gap: clamp(0px, 0.1vw, 5px);
                }
                #logo6 .miniSegment {
                    display: flex;
                }
                #logo6 .logo-Dot {
                    margin: 0;
                    color: #fff;
                    border-radius: 100px;
                    align-self: center;
                    align-content: center;
                    text-align: center;
                    width: 45px;
                    height: 45px;
                    box-shadow: 0px 10px 1px var(--panel_border);
                }
                #logo6 .logo-text {
                    margin: 0;
                    font-size: 20px;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 3px;
                    background-color: var(--alpha);
                }
                #logo6 .blueDot {
                    margin: 0;
                    background-color: #3366ff;
                    font-size: 24px;
                    font-weight: 500;
                }
                #logo6 .redDot {
                    font-size: 18px;
                    font-weight: bolder;
                    padding-top: 3px;
                    margin: 0;
                    margin-top: 20px;
                    background-color: #ff3366;
                }
                #logo6 .miniDot {
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;
                    padding: 0 5px;
                    border-radius: 100%;
                    font-size: 18px;
                    font-weight: 700;
                    background-color: #0000;
                    margin-top: 20px;
                }

                #logo6 .bigDot {
                    margin-top: 20px;
                    margin-right: 5px
                }
            `}</style>
        </div>
    );
};
export default Logo6;
