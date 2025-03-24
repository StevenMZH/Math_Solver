import AlgebraicInput from '../components/math/algebraicSolver';
import Footer from '../components/global/footer';
import AppHeader from '../components/global/appHeader';

export function Algebra() {
    return (
        <div className='pageContainer'>
            <main>
                <section>
                    <AlgebraicInput />
                </section>
            </main>
            <Footer />

            <style>{`
                main {
                    display: flex;
                }
            `}</style>
        </div>
    );
}

export default Algebra;

