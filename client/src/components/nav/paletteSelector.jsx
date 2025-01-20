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
        <div className="paletteSelectorContainer">
            <button name="darkTheme_Button" id="darkTheme_Button" className="roundButton" onClick={() => handleThemeChange('dark')}></button>
            <button name="lightTheme_Button" id="lightTheme_Button" className="roundButton" onClick={() => handleThemeChange('light')}></button>

            <style>{`
                .paletteSelectorContainer {
                    display: flex;
                    align-items: center;
                    color: var(--text);
                    margin-right: 5px;
                }

                .roundButton {
                    margin: 0 2px;
                    padding: 10px;
                    border-radius: 30px;
                    border: 2px solid;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                }

                #darkTheme_Button {
                    background-color: var(--a0);
                    border-color: var(--a4);
                }

                #lightTheme_Button {
                    background-color: var(--a3);
                    border-color: var(--a1);
                }

                @media (max-width: 768px) {
                    .paletteSelectorContainer {
                        top: 10px;
                        right: 10px;
                    }
                }
            `}</style>
        </div>
    );
}
export default PaletteSelector;