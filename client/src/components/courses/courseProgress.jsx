export function CourseProgress({ finished, total }) {
    const percentage = Math.round((finished / total) * 100);

    return (
        <div className="panelContainer progress-container">
            <div className="panel-header">
                <label className="text-focus">Course Progress</label>
            </div>
            <div className="progressCircleGraph">
                <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                        className="circle-bg"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="circle"
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                        {percentage}%
                    </text>
                </svg>
            </div>

            <style>{`
                .progress-container {
                    width: 60vw;
                }
                .progressCircleGraph {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .circular-chart {
                    width: 120px;
                    height: 120px;
                }
                .circle-bg {
                    fill: none;
                    stroke: #eee;
                    stroke-width: 3.8;
                }
                .circle {
                    fill: none;
                    stroke: #66ccaa;
                    stroke-width: 3.8;
                    stroke-linecap: round;
                    transition: stroke-dasharray 0.5s ease;
                }
                .percentage {
                    font-size: 6px;
                    text-anchor: middle;
                    fill: #bbb;
                }
            `}</style>
        </div>
    );
}

export default CourseProgress;
