import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Logo5 from '../components/header/logos/Logo5';
import Button_SideIcon from '../components/ui/Button_SideIcon';
import AccessPanel from '../components/access/AccessPanel';
import { AccessProvider } from '../components/access/AccessContext';


export function FieldBalls_Wave({
  period = 50,
  amplitude = 50,
  offset = Math.PI / 8,
  gap = "20px",
  size = 5,
  count = 64
}) {
  const dotRefs = useRef([]);
  const [currentPeriod, setCurrentPeriod] = useState(period);
  const [currentAmplitude, setCurrentAmplitude] = useState(amplitude);

  useEffect(() => {
    let frame = 0;
    let rafId;

    const animate = () => {
      dotRefs.current.forEach((dot, i) => {
        const self_offset = i * offset;
        const y = Math.sin(frame / currentPeriod + self_offset) * currentAmplitude;
        if (dot) {
          dot.style.transform = `translateY(${y}px)`;
        }
      });

      frame++;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [currentPeriod, currentAmplitude, offset, count]);

  const colors = ['#ee88bb', '#88eebb', '#88bbee', '#eebb88'];

  return (
    <div
      className="box row center overflow"
      style={{ height: `${amplitude * 2 + size}px`, gap }}
      onClick={() => { setCurrentPeriod(period / 6); setCurrentAmplitude(amplitude/2) } } // acelera
      onMouseEnter={() => { setCurrentPeriod(period / 4); setCurrentAmplitude(amplitude)} } // acelera
      onMouseLeave={() => { setCurrentPeriod(period); setCurrentAmplitude(amplitude) } }     // vuelve a normal
    >
      {Array.from({ length: count }).map((_, index) => {
        const color = colors[index % colors.length];
        return (
          <div
            key={index}
            className={`shader-container dot ${color}`}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
              transition: 'transform 0.1s'
            }}
            ref={(el) => (dotRefs.current[index] = el)}
          >
            <div className="shader-polar radius-full" />
          </div>
        );
      })}
    </div>
  );
}




export function Home() {
    const navigate = useNavigate();
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    return (
        <div className='page gap-20'>
            <div className="box start p20 gap-20 home-section1">
                <div className='box overflow center home-wave'>
                    <FieldBalls_Wave count={44} size={5} amplitude={50} period={50} offset={Math.PI/6} gap={"2%"} />
               </div>
                
                <div className="box gap-5">
                    <div className="row-start gap-10 content">
                        <label className='text-title font-H1'>Eulerian Hades</label>
                        <Logo5/>
                    </div>
                    <label className='text-subtitle font-H2'>A Learning and Problem Solving Platform for Engineering Students to intuitively learn concepts and topics from Math and Computer Science. </label>
                </div>
                
                
                <div className='row fullwidth gap-10 buttons'>
                    <button className='button-square2 font-S' onClick={() => setIsLoginVisible(true)}>Get Started</button>
                    <Button_SideIcon className='font-S' icon="/images/nav/courses.png" text="Explore Courses" func={() => navigate("/courses")}/>
                </div>

            </div>

            <div className="box row p20 gap-10 home-section2">
                <Link to="/solver" className="panel-box row fullwidth gap-10"> 
                    <img className='img-themes' src="/images/nav/solver.png" alt="solver" />
                    <label className='text-title2 center font-H2'>Problem Solvers</label>
                </Link>
                
                <Link to="/courses" className="panel-box row fullwidth gap-10"> 
                    <img className='img-themes' src="/images/nav/courses.png" alt="courses" />
                    <label className='text-title2 center font-H2'>Interactive Courses</label>
                </Link>
                
                <Link to="/ecercise" className="panel-box row fullwidth gap-10"> 
                    <img className='img-themes' src="/images/nav/exercises.png" alt="exercises" />
                    <label className='text-title2 center font-H2'>Exercises</label>
                </Link>
            </div>
            
            <AccessProvider>
              <AccessPanel isVisible={isLoginVisible} setIsVisible={setIsLoginVisible}/>              
            </AccessProvider>

            <style>{`
                header, footer.footer, main .MobileNav {
                    display: none;
                }

                .home-wave {
                    margin: 60px 0;
                    margin-bottom: 20px;
                }

                .home-section {
                    padding: 50px clamp(20px, 5*(1vw) , 50px);
                    margin-top: 50px;
                }
                .home-section1-content {
                    display: flex;
                    gap: clamp(0, 20px, 20px);
                }
                .home-section2 img {
                    width: 40px;
                    height: 40px;
                    padding: 10px;
                    background-color: #fff8;
                    border-radius: 10px;
                }
                .light .home-section2 img {
                    background-color: #0002;
                }

                .red { background-color: var(--course-red); }
                .green { background-color: var(--course-green); }
                .blue { background-color: var(--course-blue); }
                .yellow { background-color: var(--course-yellow); }
                
                @media (max-width: 640px) {
                    .home-wave {
                        margin-bottom: 30px;
                    }
                    .page .home-section2 {
                        display: flex;
                        flex-direction: column;
                    }
                    .page .home-section2 a {
                    }  
                }
            `}</style>
        </div>
    );
}

export default Home;