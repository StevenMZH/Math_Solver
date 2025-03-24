import Footer from '../components/global/footer';
import AlgebraiSolver from '../components/math/algebraicSolver';
import GeoGebraGraph from "../components/math/functionGraph";
import AppHeader from '../components/global/appHeader';


export function Solver() {
    return (
        <div className='pageContainer'>
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
