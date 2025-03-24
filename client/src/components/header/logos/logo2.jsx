export function Logo2() {
    return (
        <div className="nav-container">
            <div className="logoContainer">
                <div className="logo logo-e">e</div>
                <div className="logo logo-ulerian">ulerian Hades</div>
            </div>
            <style>{`
                .logoContainer {
                    display: flex;
                    margin: 0;
                    font-size: 1em;
                    font-family: Comfortaa;
                    text-align: center;
                    margin-right: 50px;
                }
                .logo-e {
                    margin: 0;
                    padding: 1px 7px;
                    background-color: var(--logoBg);
                    border-radius: 100px;
                    font-size: 20px;
                    align-self: center;
                }
                .logo-ulerian {
                    margin: 0;
                    padding-top: 1px;
                    align-self: center;
                    margin-left: 1px;
                    background-color: var(--alpha);
                }

            `}</style>
        </div>
    );
};
export default Logo2;
