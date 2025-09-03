export function UserStats( {courses="-", classes="-", exercises="-", streak=15} ) {

    const getStreakStyle = (streak) => {
        if (streak >= 30) { return "invert(80%) sepia(100%) saturate(500%) hue-rotate(250deg)"; } 
        else if (streak >= 15) { return "invert(50%) sepia(100%) saturate(500%) hue-rotate(0deg)"; } 
        else if (streak >= 7) { return "invert(70%) sepia(100%) saturate(300%) hue-rotate(330deg)"; }
        else if (streak >= 1) { return "invert(70%) sepia(100%) saturate(400%) hue-rotate(300deg)"; } 
        else { return "invert(70%) sepia(100%) saturate(100%) hue-rotate(180deg)"; }
    };

    const streakFilter = getStreakStyle(streak);

    return (
        <div className="box fullheight gap-10 UserStats">
            <div className="panel-box center gap-10 UserStats-streak">
                <label className='text-subtitle text-center'>Daily Streak</label>
                <div className=" row center">
                    <img className='streak-icon' style={{ filter: streakFilter }} src="/images/global/streak.png" alt="streak" />
                    <label className='text-subtitle font-XXL streak-days' style={{ filter: streakFilter }}>{streak}</label>
                </div>
            </div>
            
            <div className='row fullwidth gap-10 UserStats-courses'>
                <div className="panel-box center gap-5 p20-h">
                    <label className='text-subtitle text-center p10-w'>Completed Courses</label>
                    <label className='text-subtitle font-H1'>{courses}</label>
                </div>
                
                <div className="panel-box center gap-5 p0 p20-h">
                    <label className='text-subtitle text-center p10-w'>Completed Classes</label>
                    <label className='text-subtitle font-H1'>{classes}</label>
                </div>
                
                <div className="panel-box center gap-5 p0 ">
                    <label className='text-subtitle text-center p10-w'>Completed Exercises</label>
                    <label className='text-subtitle font-H1'>{exercises}</label>
                </div>
            </div>
            
            <style>{`

                .UserStats .text-subtitle {
                    color: #777;
                }
                .light .UserStats .text-subtitle {
                    color: #888;
                }
                .UserStats .font-H1 {
                    color: #7B8CAA;
                }
                .light .UserStats .font-H1 {
                    color: #7B8CAA;
                }
                .UserStats .UserStats-streak .font-XXL{
                    color: #d53;
                    color: #f90;
                }

                .streak-icon {
                    width: 50px;
                    height: 50px;
                }
            `}</style>
        </div>
    );
}

export default UserStats;
