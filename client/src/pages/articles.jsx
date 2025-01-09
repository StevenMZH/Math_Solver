import HomeNav from '../components/home/homeNav';
import PaletteSelector from '../components/global/paletteSelector';
import LanguageSelector from '../components/global/languageSelector';
import Footer from '../components/global/footer';
import GeoGebraGraph from "../components/math/functionGraph";

export function Articles() {    
        return (
            <div className='pageContainer'>
                <header>
                    <HomeNav/>
                    <PaletteSelector />
                </header>
                <main>
                    <GeoGebraGraph/>
                </main>
                <Footer />
            </div>
        );
    }
export default Articles;
