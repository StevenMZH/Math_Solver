import CourseClass from "./courseClass";

export function CourseUnit({ courseId, num, name, classes }) {
    return (
        <div className="panelContainer unit-container">
            <div className="panel-header unit-header">
                <label>{`Unidad ${num + 1} : ${name}`}</label>
            </div>
            <div className="classes">
                {classes && classes.length > 0 ? (
                    classes.map((classItem, index) => (
                        <CourseClass key={index} courseId={courseId} classId={classItem.id} name={classItem.name} type={classItem.type} />
                    ))
                ) : (
                    <div className='noClass-container'>
                        <label>No Classes available</label>
                    </div>
                )}
            </div>

            <style>{`
                .unit-container {
                    width: 70vw;
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

            `}</style>
        </div>
    );
}

export default CourseUnit;