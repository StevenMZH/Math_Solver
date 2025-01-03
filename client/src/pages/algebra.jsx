import '../css/normalize.css';
import '../css/webStyle.css';
import '../css/indexStyle.css';
import '../css/components/paletteSelector.css';
import AlgebraicInput from '../components/algebraic/algebraic_Input';
import Nav from '../components/global/nav';
import { PaletteSelector } from '../components/global/paletteSelector';
import { LanguageSelector } from '../components/global/languageSelector';
import { Footer } from '../components/global/footer';

export function Algebra() {
    return (
        <div className='pageContainer'>
            <header>
                <Nav />
                <PaletteSelector />
                <LanguageSelector />
            </header>
            <main>
                <section>
                    <AlgebraicInput />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Algebra;

