import {NotFound_Message} from "../components/assets/errorMessages";

export function NotFound() {
    return (
        <div className="page-center">
            <NotFound_Message/>

            <style>{`
                footer {
                    display: none;
                }
            `}</style>
        </div>
    );
}

export default NotFound;
