import { useAccountContext } from "../../context/AccountContext";
import CourseClass_link from "./ClassLink";

    export function CourseUnit({ courseId, num, name, classes }) {
        const { language } = useAccountContext();
    
        return (
        <div className="panelContainer unit-container">
            <div className="panel-header unit-header">
                <label className="text-focus">{`Unit ${num + 1} : ${name[language]}`}</label>
            </div>
            <div className="classes">
                {classes && classes.length > 0 ? (
                    classes.map((classItem, index) => (
                        <CourseClass_link key={index} courseId={courseId} classId={classItem.id} name={classItem.name[language]} type={classItem.type} />
                    ))
                ) : (
                    <div className='noClass-container'>
                        <label className="text-subtitle">No Classes Available</label>
                    </div>
                )}
            </div>

            <style>{`
                .unit-container {
                    width: 100%;
                }
                .unit-header {
                    text-align: left;
                }
                .noClass-container {
                    display: flex;
                    font-size: 10px;
                    align-items: center;
                    padding-left: 20px;
                }
                .classes {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 15px;
                }

            `}</style>
        </div>
    );
}

export default CourseUnit;