import React, { useState, useEffect } from 'react';

import AlgebraiSolver from '../components/math/AlgebraicSolver';
import GeoGebraGraph from "../components/math/FunctionGraph";
import { FailLoad_Message } from '../components/assets/errorMessages';

export function Solver() {
    const [failLoad, setFailLoad] = useState(false);

    return (
        <div className='page-container'>
            {failLoad && <FailLoad_Message/> }

            <div className="page-content">
                <AlgebraiSolver setFailLoad={setFailLoad} />
            </div>

            
            <style>{`
                .page-content {
                    display: flex;
                    align-items: start;
                    justify-content: center;
                    flex: 1;
                    
                    width: 100%;
                    height: 100%;
                    margin-top: 30px;

                }
            `}</style>
        </div>
    );
}
export default Solver;
