import { Link } from 'react-router-dom';


export function InDev() {
    return (
        <div className="page-center">

            <div className="center column fullwidth error-message">
                <img src="./public/images/pages/dev.png" alt="Page unde development" />
                
                <div className="text-title2 message-container">
                    <label className="text-center font-H1" id="error-type">Under Development</label>
                    <p className="text-subtitle center" id="error-info">New features will be available soon!</p>
                </div>
                
                <Link to="/" className='button-square text-title'>Home</Link>
            </div>

            <style>{`
                .footer div, .footer p{
                    display: none;
                }

                .error-message a {
                    margin-top: 5px;
                    width: 200px; 
                }

                .error-message img {
                    margin-bottom: 10px;
                    width: clamp(150px, 30vw, 300px); 
                    filter: invert(40%) sepia(100%) saturate(500%) hue-rotate(180deg);
                }
                .dark .error-message img {
                    filter: invert(80%) sepia(100%) saturate(500%) hue-rotate(160deg);
                }
                .light .error-message img {
                    filter: invert(20%) sepia(100%) saturate(500%) hue-rotate(150deg);
                }
                    
                .message-container {
                    display: flex;
                    flex-direction: column;
                }            
                .message-container .text-title2 {
                    font-size: 24px;
                }  
                .error-message p {
                    width: 100%;
                    padding: 5px;
                    font-size: 12px;
                }

            `}</style>
        </div>
    );
} export default InDev;
