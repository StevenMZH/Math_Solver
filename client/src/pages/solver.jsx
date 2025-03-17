import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import AlgebraiSolver from '../components/math/algebraicSolver';
import GeoGebraGraph from "../components/math/functionGraph";


export function Solver() {
    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
            </header>
            <main>
                <AlgebraiSolver/>
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
export default Solver;
