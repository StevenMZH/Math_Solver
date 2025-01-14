import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import GeoGebraGraph from "../components/math/functionGraph";

export function Articles() {
    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
            </header>
            <main>
                <GeoGebraGraph />
            </main>
            <Footer />
        </div>
    );
}
export default Articles;
