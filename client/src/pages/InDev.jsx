import { Link } from 'react-router-dom';


export function InDev() {
    return (
        <div className="page-container">
            <div className="error-message">
                <img src="./public/images/dev.png" alt="In Development" />
                <div className="message-container">
                    <label className="text-title2" id="error-type">In Development</label>
                    <p className="text-subtitle" id="error-info">This page is currently under development and will soon include new features</p>
                </div>
                <Link to="/" className='text-title'>Home</Link>
            </div>

            <style>{`
                .page-container {
                    display: flex;
                    align-item: center;
                    justify-content: center;
                }
                .footer div, .footer p{
                    display: none;
                }
                    
                .error-message {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    padding: 0 20px;
                }

                .error-message a {
                    margin-top: 5px;
                    padding: 10px;
                    width: 200px; 
                    border-radius: 5px;
                }

                .error-message img {
                    margin-bottom: 10px;
                    width: clamp(150px,30vw, 400px); 
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
