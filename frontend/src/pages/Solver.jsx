import { useState, Suspense, lazy } from 'react';

const AlgebraicSolver = lazy(() => import('../components/math/AlgebraicSolver'));
const FailLoad_Message = lazy(() => import('../components/assets/errorMessages').then(module => ({ default: module.FailLoad_Message })));

export function Solver() {
    const [failLoad, setFailLoad] = useState(false);

    return (
        <div className='page-container'>
            {failLoad && (
                <Suspense fallback={<div></div>}>
                    <FailLoad_Message />
                </Suspense>
            )}

            <div className="flex-start fullscreen page-content">
                <Suspense fallback={<div></div>}>
                    <AlgebraicSolver setFailLoad={setFailLoad} />
                </Suspense>
            </div>

            <style>{`
                .page-content {
                    margin-top: 30px;
                }
                #logo6 {
                    margin-top: 10vw;
                }
            `}</style>
        </div>
    );
}

export default Solver;
