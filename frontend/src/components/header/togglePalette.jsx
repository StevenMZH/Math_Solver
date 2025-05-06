import { useState, useEffect } from 'react';

export function TogglePalette() {
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

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme == "light") {return setTheme('dark');}
        else {return setTheme('light');}
    };
    return (
        <div className="center TogglePalette">
            <button name="Toggle Palette" className="roundButton" onClick={() => toggleTheme()}></button>
            <style>{`
                .roundButton {
                    padding: 10px;
                    border-radius: 30px;
                    border: 2px solid;
                    transition: background-color 0.3s, color 0.3s;
                }
            `}</style>
        </div>
    );
}
export default TogglePalette;