import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {NotFound_Message} from "../components/assets/errorMessages";

export function NotFound() {
    return (
        <div className="page-container">
            <NotFound_Message/>

            <style>{`
                .page-container {
                    display: flex;
                    align-item: center;
                    justify-content: center;
                }

                footer {
                    display: none;
                }
            `}</style>
        </div>
    );
}

export default NotFound;
