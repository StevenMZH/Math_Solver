import { Link } from 'react-router-dom';

export function UnexpectedError_Message() {
    return (
        <></>
    );
}

export function ConectiondError_Message() {
    return (
        <></>
    );
}


export function FailLoad_Message() {
    return (
        <div className="panelContainer text-focus failLoad-container">
            <label>Failed to load data. Please check your connection.</label>
            <button onClick={() => window.location.reload()}>Reload</button>
            <style>
                {`
                @keyframes expandAnim {
                    0% {
                        height: 0;
                        opacity: 0;
                    }
                    100% {
                        height: 100px;
                        opacity: 1;
                    }
                }

                .failLoad-container {
                    display: flex;
                    overflow: hidden;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 10px;

                    width: 100%;
                    color: #d9534f;
                    border-radius: 5px;

                    overflow: hidden;
                    animation: expandAnim 1s ease-out forwards;
                }

                .light .failLoad-container {
                    background-color: var(--panel1);
                }
                .failLoad-container label, 
                .failLoad-container button {
                    animation: expandAnim 1s ease-out forwards;
                }


                .failLoad-container button {
                    padding: 8px 16px;
                    border: none;
                    background-color: #d9534f;
                    color: white;
                    cursor: pointer;
                    border-radius: 3px;
                }

                .failLoad-container button:hover {
                    background-color: #c9302c;
                }

                @media (max-width: 640px) {
                    .failLoad-container label { 
                        font-size: 10px;
                    }
                }

                `}
            </style>
        </div>
    );
}


export function NotFound_Message({ message="This page does not exist", link="/", btnText="Go Back"}) {
    return (
        <>
            <ErrorMessage
                type="NOT FOUND"
                info={message}
                imgSourse="/public/images/404.png"
                imgAlt="This page does not exist"
                link = {link}
                btnText = {btnText}
            />
        </>

    );
}

export function ErrorMessage({type, info, imgSourse, imgAlt, link, btnText}) {
    return (
        <div className="error-message">
            <img src={imgSourse} alt={imgAlt} />

            <div className="message-container">
                <label className="text-title2" id="error-type">{type}</label>
                <p className="text-subtitle" id="error-info">{info}</p>
            </div>
            <Link to={link} className='text-title'>{btnText}</Link>                

            <style>{`
                .error-message {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;

                    padding: 0 20px;
                    padding-bottom: 30px;
                }

                .error-message a {
                    margin-top: 5px;
                    padding: 8px;
                    border-radius: 5px;
                }

                .error-message img {
                    width: clamp(200px,40vw,400px); 
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
                    font-size: 20px;
                }  
                .error-message p {
                    width: 100%;
                    padding: 5px;
                }

            `}</style>
        </div>
    );
} export default ErrorMessage;
