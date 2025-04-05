import AlgebraicInput from '../components/math/AlgebraicSolver';

export function Algebra() {
    return (
        <div className='page-container'>
                <section>
                    <AlgebraicInput />
                </section>

            <style>{`
                .page-container {
                    justify-content: center;
                    align-items: center;      
                }
            `}</style>
        </div>
    );
}

export default Algebra;

