import React from 'react';

export function Footer() {
    return (
        <footer className="footer">
            <p data-lang-key="footer.rights">© 2024 Eulerian Hades. All rights reserved.</p>
            <div className="footerNav-container">
                <nav>
                    <ul className="footerNav-ul">
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
            </div>
            <style>{`
                .footer {
                    background-color: #00000000;
                    font-size: 10px;
                    width: 100%;
                    padding: 10px 0;
                    text-align: center;
                    color: var(--text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    bottom: 0;
                }

                .footer-p {
                    margin: 0;
                }

                .footerNav-container {
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
                    color: var(--text);
                    padding: 5px 10px;
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
