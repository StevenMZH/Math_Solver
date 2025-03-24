import { Link } from 'react-router-dom';
import Footer from '../components/global/footer';
import AppHeader from '../components/global/appHeader';

export function Home() {
    return (
        <div className='pageContainer'>
            <main>
                <div className='sectionsDiv'>
                    <section className='section'>
                        <Link to="/articles" className='links'>Articles</Link>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                        </p>
                    </section>
                    <section className='section'>
                        <Link to="/courses" className='links'>Courses</Link>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                        </p>
                    </section>
                    <section className='section'>
                        <Link to="/exercises" className='links'>Exercises</Link>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                        </p>
                    </section>

                    <style>{`
                        .sectionsDiv {
                            display: flex;
                            width: 100%;
                        }

                        section {
                            display: block;
                            width: 0 10vw;
                            padding: 30px;
                        }

                        section p {
                            padding: 40px 0;
                            text-align: justify;
                            font-size: 14px;
                            line-height: normal;
                        }

                        .links {
                            padding: 10px;
                        }
                    `}</style>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;