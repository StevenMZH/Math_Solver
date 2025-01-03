import CourseReviewPanel from "../components/courses/courseReviewPanel";

import PaletteSelector from '../components/global/paletteSelector';
import LanguageSelector from '../components/global/languageSelector';
import Footer from '../components/global/footer';
import HomeNav from '../components/home/homeNav';

export function CoursesHub() {
    return (
        <div className='pageContainer'>
            <header>
                <HomeNav/>
                <PaletteSelector />
                <LanguageSelector />
            </header>

            <main>
                <div className='Filtro'>

                </div>
                <div className="coursesGrid">
                    <CourseReviewPanel
                        id="mathFundaments"
                        title="Fundamentos Matematicos"
                        type="math"
                        description="evonnnjveonveov eoveveoiveoehvjejv ev jeivjeiovejvioev efivjeov eoive"
                        topics={["Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria","Aritmetica", "Algebra", "Trigonometria"]}
                    />

                    <CourseReviewPanel
                        id="linealAlgebra"
                        title="Algebra Lineal"
                        type="math"
                        description="efefef ejfejfefke fkefjkefj ekfje owfiwjfh wfhwufhwofhwof wf wofhwfohwfh wo bnowc wf"
                        topics={["Vectores", "Matrices", "Espacio Vectorial"]}
                    />

                    <CourseReviewPanel
                        id="discreteMath"
                        title="Matematicas Discretas"
                        type="math"
                        description="eff ef efefvgbevbev"
                        topics={["Combinatoria", "Conjuntos", "Algebra Booleana"]}
                    />

                    <CourseReviewPanel
                        id="programmingFundaments"
                        title="Fundamentos de Programacion"
                        type="cs"
                        description="Compatibilidad: La técnica de -webkit-line-clamp no funciona en Firefox, por lo que es recomendable probar la apariencia en diferentes navegadores.
Soluciones alternativas: Si necesitas algo más avanzado y compatible con todos los navegadores, puedes usar JavaScript para calcular dinámicamente el truncamiento.
Compatibilidad: La técnica de -webkit-line-clamp no funciona en Firefox, por lo que es recomendable probar la apariencia en diferentes navegadores.
Soluciones alternativas: Si necesitas algo más avanzado y compatible con todos los navegadores, puedes usar JavaScript para calcular dinámicamente el truncamiento.`````"
                        topics={["defvdv", "eveve"]}
                    />

                    <CourseReviewPanel
                        id="dataStructures"
                        title="Estructura de Datos"
                        type="cs"
                        description="eff ef efefvgbevbev"
                        topics={["eef ef", "feeffe", "ef efefefe", "dfefef efef", "dffefe"]}
                    />
                </div>

                <style>{`
                    main {
                        width: 100%;
                    }

                    .coursesGrid {
                        display: grid;
                        width: 100%;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                    }

                `}</style>

            </main>

            <Footer/>
        </div>
    );
}

export default CoursesHub;