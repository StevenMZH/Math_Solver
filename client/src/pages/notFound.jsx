import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import Exercise from "../components/class/exercise";
import { ClassCard, ClassCard2, ClassImage, ClassText, ClassVideo } from "../components/class/classAssets";


export function NotFound() {
    return (
        <div className="pageContainer">
            <main>
 
            </main>

            <style>{`
            
            `}</style>
        </div>
    );
}

export default NotFound;
