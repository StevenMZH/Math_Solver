import { Link } from 'react-router-dom';
import Footer from '../components/global/footer';
import AppHeader from '../components/global/appHeader';

export function Home() {
    return (
        <div className='pageContainer'>
            <main>
                <div className='sectionsDiv'>
                    <Link to="/articles" className='panelContainer'>
                        <div className='content'>
                            <label className='text-title'>Articles</label>
                            <p className='text-focus'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                            </p>
                        </div>
                    </Link>
                    <Link to="/courses" className='panelContainer'>
                        <div className='content'>
                            <label className='text-title'>Courses</label>
                            <p className='text-focus'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                            </p>
                        </div>
                    </Link>
                    <Link to="/exercises" className='panelContainer'>
                        <div className='content'>
                            <label className='text-title'>Exercise</label>
                            <p className='text-focus'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum. <br /> <br />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsum, saepe ut officiis at quos cupiditate? Officiis, saepe veniam qui explicabo quod nesciunt, mollitia officia fugiat nulla architecto aut voluptatum.
                            </p>
                        </div>
                    </Link>

                    <style>{`
                        main {
                            display: flex;
                            weight: 100%;
                            height: 100%;
                        }

                        .sectionsDiv {
                            display: grid;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            padding: clamp(5vw, 20px, 10vw);
                            grid-template-columns: repeat(3, 1fr);
                            gap: 5vw;
                        }
                        .sectionsDiv a {
                            width: 100%;
                            height: 450px;
                            border: none;
                            transition: width 0.08s ease-in-out, height 0.2s ease-in-out;
                        }
                        .sectionsDiv a:hover {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            width: 30vw;
                            height: 70vh;
                        }
                        .sectionsDiv .content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }

                        .sectionsDiv p {
                            padding: 40px 0;
                            text-align: justify;
                            font-size: 14px;
                            line-height: normal;
                        }
                    `}</style>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;