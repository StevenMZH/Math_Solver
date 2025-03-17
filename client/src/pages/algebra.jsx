import AlgebraicInput from '../components/math/algebraicSolver';
import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';

export function Algebra() {
    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
            </header>
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

