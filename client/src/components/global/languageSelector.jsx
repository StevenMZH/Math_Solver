export function LanguageSelector() {
    return (
        <div id="languageSelector-container">
            <select id="language-selector" onchange="updateLanguage(this.value)">
                <option value="en" data-lang-key="languageSelector.english">en</option>
                <option value="es" data-lang-key="languageSelector.spanish">es</option>
            </select>
        </div>
    )
}
export default LanguageSelector;