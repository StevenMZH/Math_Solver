import AlgebraicInput from '../components/math/algebraic_Input';
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
            </header>
            <main>
                <section>
                    <AlgebraicInput />
                </section>
            </main>
            <Footer />
            
            <style>{`
                @import url('palettes.css');
                main {
                    display: flex;
                }

                .mathOutput {
                    margin-top: 120px;
                    margin-bottom: 60px;
                    font-size: 1.5em;
                    color: var(--text);
                    text-align: left;
                    width: 100%;
                    max-width: 800px;
                    word-wrap: break-word;
                    display: block;
                }

                #equationBar-title {
                    margin-top: 60px; 
                    margin-bottom: 10px; 
                    display: block; 
                }

                #equationBar {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    width: 700px;
                    height: 40px;
                    padding: 10px;
                    border-radius: 20px;
                    background-color: var(--bar);
                    color: var(--text2);
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 13px;
                }

                #equationBar-submit {
                    padding: 10px 20px;
                }

                @media (max-width: 768px) {
                    #equationBar {
                        width: 500px;
                    }
                }

                @media (max-width: 600px) {
                    #equationBar {
                        width: 400px;
                    }
                }

                @media (max-width: 500px) {
                    #equationBar {
                        width: 400px;
                    }
                }

                @media (max-width: 420px) {
                    #equationBar {
                        width: 300px;
                    }

                }
            `}</style>
        </div>
    );
}

export default Algebra;

