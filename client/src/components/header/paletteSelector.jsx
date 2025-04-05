import React, { useState, useEffect } from 'react';

export function PaletteSelector() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'dark'
    );

    useEffect(() => {
        document.body.classList.add('theme-changing');
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);

        const timeout = setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 50);

        return () => clearTimeout(timeout);
    }, [theme]);

    const handleThemeChange = (selectedTheme) => {
        console.log(`Selected theme: ${selectedTheme}`);
        setTheme(selectedTheme);
    };
    return (
        <div className="paletteSelector-container">
            <button name="darkTheme_Button" aria-label="Activate Dark Theme" id="darkTheme_Button" className="roundButton" onClick={() => handleThemeChange('dark')}></button>
            <button name="lightTheme_Button" aria-label="Activate Light Theme" id="lightTheme_Button" className="roundButton" onClick={() => handleThemeChange('light')}></button>

            <style>{`
                .paletteSelector-container {
                    display: flex;
                    align-items: center;
                    color: var(--text);
                    margin-right: 5px;
                    gap: 3px;
                }

                .roundButton {
                    padding: 10px;
                    border-radius: 30px;
                    border: 2px solid;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                }

                #darkTheme_Button {
                    background-color: #333;
                    border-color: var(--panelOpposite);
;
                }
                #lightTheme_Button {
                    background-color: var(--panel-light);
                    border-color: var(--panelOpposite);
                }

                @media (max-width: 640px) {
                    .paletteSelector-container {
                        flex-direction: column;
                        gap: 3px;
                        margin-left: 5px;
                        display: none;
                    }
                    .roundButton {
                        padding: 5px;
                    }
                }

            `}</style>
        </div>
    );
}
export default PaletteSelector;