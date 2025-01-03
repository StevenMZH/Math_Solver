import React, { useState, useEffect } from 'react';

export function PaletteSelector() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'dark'
    );

    useEffect(() => {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (selectedTheme) => {
        console.log(`Selected theme: ${selectedTheme}`);
        setTheme(selectedTheme);
    };

    return (
        <div className="paletteSelectorContainer">
            <button name="darkTheme_Button" id="darkTheme_Button" className="roundButton" onClick={() => handleThemeChange('dark')}></button>
            <button name="lightTheme_Button" id="lightTheme_Button" className="roundButton" onClick={() => handleThemeChange('light')}></button>
        </div>
    );
}
export default PaletteSelector;
