import React from 'react';

export function Footer() {
    return (
        <footer className="footer">
            <p className="text-focus footer-p" data-lang-key="footer.rights">© 2025 Eulerian Hades. All rights reserved.</p>
            <div className="footerNav-container">
                <nav className='footer-nav'>
                    <ul className="footerNav-ul">
                        <li><a href="/about" className='text-title2'>About</a></li>
                    </ul>
                </nav>
            </div>
            <style>{`
                @keyframes appearAnim {
                    0% { display: none; }
                    90% { display: none; }
                    100% { display: flex; }
                }

                footer {
                    animation: appearAnim 1s ease-in-out;
                }

                .footer-nav {
                    margin-bottom: 2px;
                }
                .footer {
                    display: flex;
                    background-color: #00000000;
                    font-size: 10px;
                    width: 100%;
                    padding: 7px 0;
                    padding-top: 6px;
                    text-align: center;
                    color: var(--text_title);
                    justify-content: center;
                    align-items: center;
                    bottom: 0;
                }

                .footer-p {
                    font-size: 10px;
                    margin: 0;
                }

                .footerNav-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                }

                .footerNav-ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 10px;
                }

                .footerNav-container nav a {
                    text-decoration: none;
                    background-color: var(--button);
                    padding: 2px 5px;
                    border: 2px solid var(--button);
                    border-radius: 25px;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 0.75em;
                }

                .footerNav-container nav a:hover {
                    background-color: var(--button_hover);
                    border: 2px solid var(--button_hover);
                    color: var(--text);
                }

                @media (max-width: 768px) {
                    .footerNav-container nav a {
                        font-size: 0.7em;
                        margin: 0;
                        padding: 2px 5px;
                    }
                }


            `}</style>
        </footer>
    );
}

export default Footer;
