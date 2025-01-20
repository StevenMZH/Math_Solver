import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import GeoGebraGraph from "../components/math/functionGraph";

export function Solver() {
    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
            </header>
            <main>
                <div className='sideSearch-container'>
                    <div className='solverSearchBar-container'>
                        <input className='searchBar solverSearchBar' placeholder='Search a Solver'></input>
                    </div>
                </div>
                <div className='solverContent'>

                </div>
            </main>
            <Footer />

            <style>{`
                .solverSearchBar {
                }

                .sideSearch {
                }

                .solverContent {
                }
                
            `}</style>
        </div>
    );
}
export default Solver;
