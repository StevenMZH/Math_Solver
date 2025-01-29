import AlgebraicInput from '../components/math/algebraic_Input';
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

                #equationBar-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    width: fit-content; /* Ajusta el ancho al contenido */
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                
                #equationBar {

                    width: 700px;
                    height: 40px;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 13px;
                }

                .button-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    display: flex;
                    justify-content: end;
                    align-items: center;
                }

                .searchButton {
                    top: 0;
                    position: absolute;
                    margin-top: 2px;
                    margin-right: 3px;
                    border: none;
                    background-color: #00000000;
                    border-radius: 50%;
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;    
                }
                .searchButton:hover {
                    background-color: #00000022;
                }
                .searchIcon {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
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

